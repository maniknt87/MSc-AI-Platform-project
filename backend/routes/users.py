# ==========================================
# User & Multi-Cloud Role Routes
# ==========================================

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from database.database import get_connection


router = APIRouter(
    prefix="/users",
    tags=["Users & Cloud Roles"]
)


# ==========================================
# Cloud Role Request
# ==========================================

class CloudRoleRequest(BaseModel):

    username: str

    cloud: str

    account_name: str

    account_id: str = ""

    cloud_role: str


# ==========================================
# Get All Users
# ==========================================

@router.get("")
def get_users():

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT
            id,
            username,
            email,
            role,
            allowed_region,
            created_at
        FROM users
        ORDER BY id
        """
    )

    users = cursor.fetchall()

    connection.close()

    return {
        "users": [
            dict(user)
            for user in users
        ]
    }


# ==========================================
# Get Cloud Roles for User
# ==========================================

@router.get("/{username}/roles")
def get_user_roles(username):

    connection = get_connection()

    cursor = connection.cursor()

    cursor.execute(
        """
        SELECT
            u.username,
            u.role AS platform_role,
            u.allowed_region,
            r.cloud,
            r.account_name,
            r.account_id,
            r.cloud_role
        FROM users u

        LEFT JOIN user_cloud_roles r
        ON u.id = r.user_id

        WHERE u.username = ?
        """,
        (username,)
    )

    rows = cursor.fetchall()

    connection.close()

    if not rows:

        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    return {
        "username": rows[0]["username"],

        "platform_role":
            rows[0]["platform_role"],

        "allowed_region":
            rows[0]["allowed_region"],

        "cloud_roles": [

            {
                "cloud": row["cloud"],

                "account_name":
                    row["account_name"],

                "account_id":
                    row["account_id"],

                "cloud_role":
                    row["cloud_role"]

            }

            for row in rows

            if row["cloud"] is not None

        ]
    }


# ==========================================
# Assign Cloud Role
# ==========================================

@router.post("/roles")
def assign_cloud_role(
    request: CloudRoleRequest
):

    connection = get_connection()

    cursor = connection.cursor()


    # --------------------------------------
    # Find User
    # --------------------------------------

    cursor.execute(
        """
        SELECT id
        FROM users
        WHERE username = ?
        """,
        (request.username,)
    )

    user = cursor.fetchone()

    if not user:

        connection.close()

        raise HTTPException(
            status_code=404,
            detail="User not found."
        )

    user_id = user["id"]


    # --------------------------------------
    # Check Duplicate Role
    # --------------------------------------

    cursor.execute(
        """
        SELECT id
        FROM user_cloud_roles
        WHERE user_id = ?
        AND cloud = ?
        AND account_name = ?
        AND cloud_role = ?
        """,
        (
            user_id,
            request.cloud,
            request.account_name,
            request.cloud_role
        )
    )

    existing_role = cursor.fetchone()

    if existing_role:

        connection.close()

        return {
            "success": True,
            "message": "Cloud role already exists."
        }


    # --------------------------------------
    # Insert Role Mapping
    # --------------------------------------

    cursor.execute(
        """
        INSERT INTO user_cloud_roles (
            user_id,
            cloud,
            account_name,
            account_id,
            cloud_role
        )
        VALUES (?, ?, ?, ?, ?)
        """,
        (
            user_id,
            request.cloud,
            request.account_name,
            request.account_id,
            request.cloud_role
        )
    )

    connection.commit()

    connection.close()

    return {
        "success": True,
        "message": "Cloud role assigned successfully."
    }


# ==========================================
# Remove Duplicate Cloud Role
# ==========================================

@router.delete("/roles")
def remove_cloud_role(
    request: CloudRoleRequest
):

    connection = get_connection()

    cursor = connection.cursor()


    # --------------------------------------
    # Find User
    # --------------------------------------

    cursor.execute(
        """
        SELECT id
        FROM users
        WHERE username = ?
        """,
        (request.username,)
    )

    user = cursor.fetchone()

    if not user:

        connection.close()

        raise HTTPException(
            status_code=404,
            detail="User not found."
        )


    # --------------------------------------
    # Find Matching Roles
    # --------------------------------------

    cursor.execute(
        """
        SELECT id
        FROM user_cloud_roles
        WHERE user_id = ?
        AND cloud = ?
        AND account_name = ?
        AND cloud_role = ?
        ORDER BY id
        """,
        (
            user["id"],
            request.cloud,
            request.account_name,
            request.cloud_role
        )
    )

    roles = cursor.fetchall()


    # --------------------------------------
    # Keep One Record
    # --------------------------------------

    if len(roles) <= 1:

        connection.close()

        return {
            "success": True,
            "message": "No duplicate role found."
        }


    # --------------------------------------
    # Delete Duplicate Records
    # --------------------------------------

    duplicate_ids = [
        role["id"]
        for role in roles[1:]
    ]

    placeholders = ",".join(
        "?"
        for _ in duplicate_ids
    )

    cursor.execute(
        f"""
        DELETE FROM user_cloud_roles
        WHERE id IN ({placeholders})
        """,
        duplicate_ids
    )

    connection.commit()

    connection.close()

    return {
        "success": True,
        "message": "Duplicate cloud roles removed."
    }
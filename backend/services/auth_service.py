# ==========================================
# Authentication Service
# ==========================================

import hashlib

from database.database import get_connection


# ------------------------------------------
# Password Hashing
# ------------------------------------------

def hash_password(password):

    return hashlib.sha256(
        password.encode("utf-8")
    ).hexdigest()


# ------------------------------------------
# Create User
# ------------------------------------------

def create_user(
    username,
    email,
    password,
    role="Read Only",
    allowed_region="All approved regions"
):

    connection = get_connection()

    cursor = connection.cursor()

    password_hash = hash_password(password)

    try:

        cursor.execute(
            """
            INSERT INTO users (
                username,
                email,
                password_hash,
                role,
                allowed_region
            )
            VALUES (?, ?, ?, ?, ?)
            """,
            (
                username,
                email,
                password_hash,
                role,
                allowed_region
            )
        )

        connection.commit()

        return {
            "success": True,
            "message": "User created successfully."
        }

    except Exception as error:

        return {
            "success": False,
            "message": str(error)
        }

    finally:

        connection.close()


# ------------------------------------------
# Authenticate User
# ------------------------------------------

def authenticate_user(
    username,
    password
):

    connection = get_connection()

    cursor = connection.cursor()

    password_hash = hash_password(password)

    cursor.execute(
        """
        SELECT
            id,
            username,
            email,
            role,
            allowed_region
        FROM users
        WHERE username = ?
        AND password_hash = ?
        """,
        (
            username,
            password_hash
        )
    )

    user = cursor.fetchone()

    connection.close()

    if not user:

        return None

    return {
        "id": user["id"],
        "username": user["username"],
        "email": user["email"],
        "role": user["role"],
        "allowed_region": user["allowed_region"]
    }
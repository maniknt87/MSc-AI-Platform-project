# ==========================================
# Authentication Routes
# ==========================================

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from services.auth_service import (
    authenticate_user,
    create_user
)


router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# ==========================================
# Login Request
# ==========================================

class LoginRequest(BaseModel):

    username: str

    password: str


# ==========================================
# Create User Request
# ==========================================

class CreateUserRequest(BaseModel):

    username: str

    email: str

    password: str

    role: str = "Read Only"

    allowed_region: str = "All approved regions"


# ==========================================
# Login
# ==========================================

@router.post("/login")
def login(request: LoginRequest):

    user = authenticate_user(
        request.username,
        request.password
    )

    if not user:

        raise HTTPException(
            status_code=401,
            detail="Invalid username or password."
        )

    return {
        "message": "Login successful.",
        "user": user
    }


# ==========================================
# Create User
# ==========================================

@router.post("/users")
def register_user(request: CreateUserRequest):

    result = create_user(
        username=request.username,
        email=request.email,
        password=request.password,
        role=request.role,
        allowed_region=request.allowed_region
    )

    if not result["success"]:

        raise HTTPException(
            status_code=400,
            detail=result["message"]
        )

    return result
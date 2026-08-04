from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes.deployment import router as deployment_router

app = FastAPI(
    title="Landing Zone Platform API",
    version="1.0.0",
    description="Backend API for Cloud Landing Zone Provisioning"
)

# Allow React Frontend
origins = [
    "http://localhost:5173",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(deployment_router)


@app.get("/")
def home():
    return {
        "message": "Landing Zone Platform API is running successfully."
    }
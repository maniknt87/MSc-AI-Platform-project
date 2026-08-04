from fastapi import FastAPI

from routes.deployment import router as deployment_router

app = FastAPI(
    title="Landing Zone Platform API",
    version="1.0.0",
    description="Backend API for Cloud Landing Zone Provisioning"
)

app.include_router(deployment_router)


@app.get("/")
def home():

    return {
        "message": "Landing Zone Platform API is running successfully."
    }
from fastapi import FastAPI

from routes.intelligence import (
    router as intelligence_router,
)

app = FastAPI(
    title="EduInsight Intelligence Service",
    version="1.0.0",
)

app.include_router(

    intelligence_router,

    prefix="/api/intelligence",

    tags=["Learning Intelligence"],

)


@app.get("/")
def root():

    return {

        "status": "running",

        "service":
        "EduInsight Intelligence",

    }
from fastapi import FastAPI
from sqlmodel import SQLModel
from repository.db_connection import engine
from server.item_controller import item_router

SQLModel.metadata.create_all(engine)

# Create a FastAPI instance
app = FastAPI()

# Include the routers for controllers
app.include_router(item_router)


@app.get("/")
def read_root():
    return {"Hello": "World"}


if __name__ == "__main__":
    # Run the application using uvicorn
    from uvicorn import run
    run(app, host='0.0.0.0', port=8000)

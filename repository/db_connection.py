from sqlmodel import Session, create_engine

# Connect to the SQLite database
DB_URL = "sqlite:///./test.db"
engine = create_engine(DB_URL)


def get_session():
    with Session(engine) as session:
        return session

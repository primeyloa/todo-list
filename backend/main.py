import sqlite3
from pathlib import Path

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel


DATABASE_PATH = Path(__file__).with_name("todos.db")


class Todo(BaseModel):
    id: int
    title: str
    description: str
    completed: bool


app = FastAPI(title="Todo List API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def get_connection() -> sqlite3.Connection:
    connection = sqlite3.connect(DATABASE_PATH)
    connection.row_factory = sqlite3.Row
    return connection


def initialize_database() -> None:
    connection = get_connection()
    connection.execute(
        """
        CREATE TABLE IF NOT EXISTS todos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            title TEXT NOT NULL,
            description TEXT NOT NULL,
            completed INTEGER NOT NULL DEFAULT 0
        )
        """
    )
    todo_count = connection.execute("SELECT COUNT(*) FROM todos").fetchone()[0]
    if todo_count == 0:
        connection.executemany(
            "INSERT INTO todos (title, description, completed) VALUES (?, ?, ?)",
            [
                ("Racing", "Join a Go-Kart racing tourney", 0),
                ("Study", "Study for the upcoming tests", 1),
                ("Record song sample", "Go to recording studio to get your verse recorded", 0),
                ("Charge my phone", "Place your phone on charge", 0),
                ("Lunch", "Have lunch with your family", 1),
                ("Reading", "Read The Great Gatsby", 0),
            ],
        )
    connection.commit()
    connection.close()


initialize_database()


@app.get("/")
def home() -> dict[str, str]:
    return {"message": "Todo API is running"}


@app.get("/todos", response_model=list[Todo])
def get_todos() -> list[Todo]:
    connection = get_connection()
    rows = connection.execute(
        "SELECT id, title, description, completed FROM todos ORDER BY id"
    ).fetchall()
    connection.close()
    return [
        Todo(
            id=row["id"],
            title=row["title"],
            description=row["description"],
            completed=bool(row["completed"]),
        )
        for row in rows
    ]
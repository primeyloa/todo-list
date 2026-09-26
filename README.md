# Todo List App

A simple todo list built with HTML, CSS, JavaScript, FastAPI, Pydantic, and SQLite.

## Run the app

Start the backend from the project root:

```bash
uvicorn backend.main:app --reload --port 8000
```

Serve the frontend in a second terminal:

```bash
python3 -m http.server 5500 --directory frontend
```

Open <http://127.0.0.1:5500> in a browser.

The backend creates and seeds `backend/todos.db` automatically. The frontend loads tasks from `GET /todos`.

## Project layout

- `frontend/` contains the HTML, CSS, JavaScript, and images.
- `backend/` contains the FastAPI application and SQLite database.
- `evidence/` contains the required assessment screenshots.
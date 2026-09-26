# Submission Notes

## Frontend structure

The page uses a header for the app title and profile area, a todo container for the task cards, and an add-todo control with a modal form. Each task card contains a title, description, status label, and checkbox. CSS gives completed and incomplete tasks different colors while keeping the layout usable on smaller screens.

## Frontend challenges

The first version displayed local sample data. The integration required removing that duplicate source and loading the records from FastAPI instead. The renderer now creates elements with `textContent`, which keeps todo values as text and avoids treating them as HTML.

## Backend challenges

FastAPI was not installed in the initial Python interpreter, so the project dependency was installed in the workspace environment and the server was run with that environment's Uvicorn executable. During the first endpoint check, the SQLite `completed` value also needed explicit conversion from `0` or `1` to a Python Boolean for the Pydantic model.

## Data flow

`initialize_database()` creates `todos.db`, creates the `todos` table if needed, and inserts six starter records when the table is empty. `GET /todos` selects the records, converts each SQLite row into a `Todo` Pydantic object, and returns JSON. The browser fetches that endpoint, then creates the card elements and adds them to `#todo-container`.

## Run commands

From the project root:

```text
/home/prime/Code/databloom/.venv/bin/uvicorn backend.main:app --reload --port 8000
```

In a second terminal, serve `frontend/` with a static server such as `python3 -m http.server 5500`, then open `http://127.0.0.1:5500/index.html`.
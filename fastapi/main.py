import sqlite3
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()

origins = [
    "http://localhost:5173",
    "http://localhost:8000",
    "http://localhost:8080",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Todo(BaseModel):
    id: int = None
    title: str
    description: str
    completed: bool

# Initialize SQLite database
def init_db():
    conn = sqlite3.connect("todo.db")
    c = conn.cursor()
    c.execute('''CREATE TABLE IF NOT EXISTS todos (id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT, description TEXT, completed BOOLEAN)''')
    conn.commit()
    conn.close()

init_db()

@app.get("/", tags=["Home"])
async def read_root():
    return {"message": "My Todo List"}

@app.get("/todos", response_model=List[Todo])
async def get_all_todos():
    conn = sqlite3.connect("todo.db")
    c = conn.cursor()
    c.execute("SELECT id, title, description, completed FROM todos")
    todos = c.fetchall()
    conn.close()
    return [{"id": t[0], "title": t[1], "description": t[2], "completed": bool(t[3])} for t in todos]


@app.get("/todos/{todo_id}", response_model=Todo)
async def get_single_todo(todo_id: int):
    conn = sqlite3.connect("todo.db")
    c = conn.cursor()
    c.execute("SELECT title, description, completed FROM todos WHERE id=?", (todo_id,))
    todo = c.fetchone()
    conn.close()
    if todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    return {"title": todo[0], "description": todo[1], "completed": bool(todo[2])}

@app.post("/todos/", response_model=Todo)
async def create_todo(todo: Todo):
    conn = sqlite3.connect("todo.db")
    c = conn.cursor()
    c.execute("INSERT INTO todos (title, description, completed) VALUES (?, ?, ?)", (todo.title, todo.description, todo.completed))
    # Fetch the last row id (which serves as the auto-generated ID)
    new_id = c.lastrowid
    conn.commit()
    conn.close()
    # Include the new ID when returning the todo
    return {**todo.dict(), "id": new_id}

@app.put("/todos/{todo_id}", response_model=Todo)
async def update_todo(todo_id: int, todo: Todo):
    conn = sqlite3.connect("todo.db")
    c = conn.cursor()
    c.execute("UPDATE todos SET title=?, description=?, completed=? WHERE id=?", (todo.title, todo.description, todo.completed, todo_id))
    conn.commit()
    conn.close()
    if c.rowcount == 0:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

@app.delete("/todos/{todo_id}", response_model=Todo)
async def delete_todo(todo_id: int):
    conn = sqlite3.connect("todo.db")
    c = conn.cursor()
    c.execute("SELECT title, description, completed FROM todos WHERE id=?", (todo_id,))
    todo = c.fetchone()
    if todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")
    c.execute("DELETE FROM todos WHERE id=?", (todo_id,))
    conn.commit()
    conn.close()
    return {"title": todo[0], "description": todo[1], "completed": bool(todo[2])}


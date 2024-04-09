from fastapi import FastAPI
from models import Todo
from database import metadata, engine, database, todos

metadata.create_all(engine)

app = FastAPI()


########## Lifecycle Events ##########
@app.on_event("startup")
async def startup():
    await database.connect()


@app.on_event("shutdown")
async def shutdown():
    await database.disconnect()


########## Routes ##########
@app.get("/")
async def root():
    return {"message": "Hello World"}


# Get all todos

@app.get("/notes/", response_model=list[Todo])
async def get_todos():
    query = todos.select()
    return await database.fetch_all(query)

# Get single todo
@app.get("/todos/{todo_id}")
async def get_todos(todo_id: int):
    for todo in todos:
        if todo.id == todo_id:
            return {"todo": todo}
        
    return {"message": "No Todos Found"}

# Create a todo
@app.post("/todos")
async def create_todos(todo: Todo):
    todos.append(todo)
    return {"message": "Todo has been created"}

# Update a todo
@app.put("/todos/{todo_id}")
async def update_todos(todo_id: int, todo_obj: Todo):
    for todo in todos:
        if todo.id == todo_id:
            todo.id = todo_id
            todo.item = todo_obj.item
            return {"todo": todo}
        
    return {"message": "No Todos Found to update"}
# Delete a todo
@app.delete("/todos/{todo_id}")
async def delete_todos(todo_id: int):
    for todo in todos:
        if todo.id == todo_id:
            todos.remove(todo)
            return {"message": "Todo has been DELETED!"}
        
    return {"message": "No Todos Found"}



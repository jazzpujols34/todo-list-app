import React, { useState, useEffect } from 'react';
import { fetchTodos, createTodo, updateTodo, deleteTodo } from './api.jsx';
import Todo from './Todo.jsx';
import { Container, Typography, TextField, Button, List } from '@mui/material';
import styled from '@emotion/styled';
import { makeStyles } from '@mui/styles';

const AddTodoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`;

const StyledTextField = styled(TextField)`
  width: 40%;  // Increase width
  .MuiInputLabel-root {
    font-size: 1.5rem;
  }
  .MuiInputBase-root {
    font-size: 1.2rem;
  }
`;

const StyledButton = styled(Button)`
  font-size: 1.2rem;
  padding: 12px 24px;  // Increase padding
`;

const useStyles = makeStyles({
  container: {
    backgroundColor: '#F5F5F5',  // Soft Gray
    minHeight: '100vh',
    padding: '20px 0',
  },
  header: {
    color: '#333',  // Darker Text
    marginBottom: '30px',
  },
  addButton: {
    backgroundColor: '#4CAF50',  // Gentle Blue
    color: 'white',
    '&:hover': {
      backgroundColor: '#45a049',  // Slightly darker when hovered
    },
  },
});

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({ title: '', description: '', completed: false });
  const classes = useStyles();
  
  useEffect(() => {
    const fetchData = async () => {
      const fetchedTodos = await fetchTodos();
      setTodos(fetchedTodos);
    };

    fetchData();
  }, []);

  const handleAddTodo = async () => {
    const todo = await createTodo(newTodo);
    setTodos([...todos, todo]);
    setNewTodo({ title: '', description: '', completed: false }); 
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    const updated = await updateTodo(id, updatedTodo);
    setTodos(todos.map((todo) => (todo.id === id ? updated : todo)));
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <Container maxWidth="md" className={classes.container}>
      <Typography variant="h1" gutterBottom className={classes.header}>
        Todo App
      </Typography>
      
      {/* Add New Todo */}
      <AddTodoContainer>
        <StyledTextField
          label="Title"
          variant="outlined"
          value={newTodo.title}  // Bind value
          onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}  // Bind onChange
          // ... (rest of your existing code)
        />
        <StyledTextField
          label="Description"
          variant="outlined"
          value={newTodo.description}  // Bind value
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}  // Bind onChange
        />
        <StyledButton variant="contained" className={classes.addButton} onClick={handleAddTodo}>
          Add Todo
        </StyledButton>
      </AddTodoContainer>

      {/* Display Todos */}
      <List>
        {todos.map((todo, index) => (
          <Todo
            key={index}
            todo={todo}
            index={index}
            updateTodo={handleUpdateTodo}
            deleteTodo={handleDeleteTodo}
          />
        ))}
      </List>
    </Container>
  );
}

export default App;

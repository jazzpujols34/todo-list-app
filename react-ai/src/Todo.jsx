import React, { useState, useEffect  } from 'react';
import { ListItem, ListItemText, Checkbox, IconButton, ListItemSecondaryAction } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import styled from '@emotion/styled';
import TextField from '@mui/material/TextField';
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';


const StyledListItem = styled(ListItem)`
  &:hover {
    background-color: #f0f0f0;`;


const CompletedText = styled.span`
  text-decoration: line-through;`;


const Todo = ({ todo, updateTodo, deleteTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [newTodo, setNewTodo] = useState({ title: todo.title, description: todo.description });
  const [isCompleted, setIsCompleted] = useState(todo.completed); // New local state
  
  useEffect(() => {
    setIsCompleted(todo.completed); // Update local state when todo prop changes
  }, [todo]);
  
  const handleSave = () => {
    updateTodo(todo.id, newTodo);  // Update the todo in the backend
    todo.title = newTodo.title;  // Update the local state
    todo.description = newTodo.description;  // Update the local state
    setIsEditing(false);
  };

  const toggleCompletion = () => {
    const updatedStatus = !isCompleted;
    setIsCompleted(updatedStatus); // Update local state immediately
    updateTodo(todo.id, { ...todo, completed: updatedStatus }); // Update backend
  };

  return (
    <StyledListItem key={todo.id}>
      <Checkbox
        edge="start"
        checked={isCompleted}
        tabIndex={-1}
        disableRipple
        onClick={toggleCompletion}
      />
      {isEditing ? (
        <>
          <TextField 
            value={newTodo.title} 
            onChange={(e) => setNewTodo({ ...newTodo, title: e.target.value })}
          />
          <TextField 
            value={newTodo.description} 
            onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          />
        </>
      ) : (
        <ListItemText 
          primary={isCompleted ? <CompletedText>{todo.title}</CompletedText> : todo.title} 
          secondary={todo.description} 
        />
      )}
      <ListItemSecondaryAction>
        {isEditing ? (
          <IconButton edge="end" onClick={handleSave}>
            <SaveIcon />
          </IconButton>
        ) : (
          <IconButton edge="end" onClick={() => setIsEditing(true)}>
            <EditIcon />
          </IconButton>
        )}
          <IconButton edge="end" onClick={() => {
            console.log(`Attempting to delete todo with ID: ${todo.id}`);  // Debugging line
            deleteTodo(todo.id);
          }}>
            <DeleteIcon />
        </IconButton>
      </ListItemSecondaryAction>
    </StyledListItem>
  );
};

export default Todo;

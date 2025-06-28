// src/hooks/useTodos.js
import { useState } from 'react';
// import '../../styles.css';


/**
 * Custom hook to manage todo list state and actions.
 */
export function useTodos() {
  const [todos, setTodos] = useState([]);

  
  const addTodo = (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      done: false
    };
    setTodos([...todos, newTodo]);
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, done: !todo.done } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo
  };
}

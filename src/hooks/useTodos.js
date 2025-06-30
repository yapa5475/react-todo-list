import { useEffect, useState } from "react";

const API_URL = "http://localhost:3001/todos";

export function useTodos() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
  fetch(API_URL)
    .then(res => res.json())
    .then(setTodos)
    .catch(err => console.error("Failed to fetch todos:", err));
}, []);

function addTodo(title) {
  const newTodo = { title, completed: false };

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  })
    .then(res => res.json())
    .then(data => setTodos(prev => [...prev, data]));
}

function toggleTodo(id, completed) {
  fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ completed }),
  })
    .then(res => res.json())
    .then(updated => {
      setTodos(prev =>
        prev.map(t => (t.id === updated.id ? updated : t))
      );
    })
    .catch(err => console.error("Toggle failed:", err));
}

function deleteTodo(id) {
  fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  }).then(() =>
    setTodos(prev => prev.filter(todo => todo.id !== id))
  );
}


function duplicateTodo(id) {
  const original = todos.find(todo => todo.id === id);
  if (!original) return;

  const newTodo = {
    title: original.title,
    completed: original.completed,
  };

  fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  })
    .then(res => res.json())
    .then(added => setTodos(prev => [...prev, added]));
}


function markAllAsCompleted() {
  setTodos(todos.map(todo => ({ ...todo, completed: true })));
}

function deleteAllTodos() {
  setTodos([]);
}

return {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    duplicateTodo,
    markAllAsCompleted,
    deleteAllTodos,
  };
}
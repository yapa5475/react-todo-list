import { useEffect, useState } from "react";

export function useTodos() {
  const [todos, setTodos] = useState(() => {
    const items = localStorage.getItem("ITEMS");
    return items ? JSON.parse(items) : [];
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

  function addTodo(title) {
    setTodos([...todos, { id: crypto.randomUUID(), title, completed: false }]);
  }

  function toggleTodo(id) {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  }

  function deleteTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function duplicateTodo(id) {
    setTodos(currentTodos => 
        currentTodos.flatMap(todo =>
          todo.id === id ? [{ ...todo, id: crypto.randomUUID() }, todo] : [todo]
        )
    )
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
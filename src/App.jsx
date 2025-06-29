import { useTodos } from "./hooks/useTodos";
import NewTodoForm from "./components/NewTodoForm";
import TodoList from "./components/TodoList";
import Counter from "./components/Counter";
import React from "react";
import "./App.css";

export default function App() {
  const {
    todos,
    addTodo,
    toggleTodo,
    deleteTodo,
    duplicateTodo,
    markAllAsCompleted,
    deleteAllTodos
  } = useTodos();

  return (
    <div className="app">
      <NewTodoForm onSubmit={addTodo} />
      <Counter todos={todos} />
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        duplicateTodo={duplicateTodo}
        markAllAsCompleted={markAllAsCompleted}
        deleteAllTodos={deleteAllTodos}
      />
    </div>
  );
}
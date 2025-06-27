import { useEffect, useState } from "react";
import { NewTodoForm } from "./components/NewTodoForm";
import { TodoList } from "./components/TodoList";
import { Counter } from "./components/Counter";
import "./styles.css";

export default function App() {
  const [todos, setTodos] = useState(() => {
    const items = localStorage.getItem("ITEMS");
    return items ? JSON.parse(items) : [];
  });

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos));
  }, [todos]);

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

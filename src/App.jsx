import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import "./styles.css"
import { TodoList } from "./TodoList"
import React from "react"

export default function App() {
  const [todos, setTodos] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")
    if (localValue == null) return []

    return JSON.parse(localValue)
  })

  useEffect(() => {
    localStorage.setItem("ITEMS", JSON.stringify(todos))
  }, [todos])

  function addTodo(title) {
    setTodos(currentTodos => {
      if (currentTodos.some(todo => todo.title === title)) {
        const shouldDuplicate = window.confirm(
          "A todo with this title already exists. Do you want to add it anyway?"
        )

        if (!shouldDuplicate) return currentTodos
      }

      return [
        ...currentTodos,
        { id: crypto.randomUUID(), title, completed: false },
      ]
    })
  }

  function toggleTodo(id, completed) {
    setTodos(currentTodos =>
      currentTodos.map(todo =>
        todo.id === id ? { ...todo, completed } : todo
      )
    )
  }

  function deleteTodo(id) {
    setTodos(currentTodos => currentTodos.filter(todo => todo.id !== id))
  }

  function duplicateTodo(title) {
    setTodos(currentTodos => [
      ...currentTodos,
      { id: crypto.randomUUID(), title, completed: false },
    ])
  }

  function markAllAsCompleted() {
    setTodos(currentTodos =>
      currentTodos.map(todo => ({ ...todo, completed: true }))
    )
  }

  function deleteAllTodos() {
    console.log("Deleting all todos")
    setTodos([])
  }

  return (
    <>
      <h1 className="header">Todo List</h1>
      <TodoList
        todos={todos}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        duplicateTodo={duplicateTodo}
        markAllAsCompleted={markAllAsCompleted}
        deleteAllTodos={deleteAllTodos}
      />
      <NewTodoForm onSubmit={addTodo} />
      <br />
      <button
        className="btn btn-hover"
        onClick={() =>
          setTodos([
            {
              id: crypto.randomUUID(),
              title: "New Task",
              completed: false,
            },
          ])
        }
      >
        ➕ New Todo List
      </button>
    </>
  )
}
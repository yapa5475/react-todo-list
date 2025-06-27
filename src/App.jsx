import { useEffect, useState } from "react"
import { NewTodoForm } from "./NewTodoForm"
import "./styles.css"
import { TodoList } from "./TodoList"
import React from 'react';

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
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        if (todo.id === id) {
          return { ...todo, completed }
        }

        return todo
      })
    })
  }

  function deleteTodo(id) {
    setTodos(currentTodos => {
      return currentTodos.filter(todo => todo.id !== id)
    })
  }

  function duplicateTodo(title) {
    setTodos(currentTodos => {
        return [
            ...currentTodos,
            { id: crypto.randomUUID(), title, completed: false },
        ]
    })
  }

  function markAllAsCompleted() {
    setTodos(currentTodos => {
      return currentTodos.map(todo => {
        return { ...todo, completed: true }
      })
    })
  }

  function deleteAllTodos() {
    console.log("Deleting all todos");
    setTodos([]);
  }

  return (
    <>
      <NewTodoForm onSubmit={addTodo} />
      <h1 className="header">Todo List</h1>
      <TodoList todos={todos} toggleTodo={toggleTodo} deleteTodo={deleteTodo} duplicateTodo={duplicateTodo} markAllAsCompleted={markAllAsCompleted} deleteAllTodos={deleteAllTodos} />
    </>
  )
}

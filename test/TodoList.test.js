import React from 'react';
import { render, screen } from '@testing-library/react';
import { TodoList } from '../src/components/TodoList';
import '@testing-library/jest-dom';

describe("TodoList", () => {
  const baseProps = {
    toggleTodo: jest.fn(),
    deleteTodo: jest.fn(),
    duplicateTodo: jest.fn(),
    markAllAsCompleted: jest.fn(),
    deleteAllTodos: jest.fn()
  }

  it("does not show action buttons when there are no todos", () => {
    render(<TodoList {...baseProps} todos={[]} />)

    expect(screen.queryByText("Mark All as Completed")).not.toBeInTheDocument()
    expect(screen.queryByText("Delete All")).not.toBeInTheDocument()
    expect(screen.getByText("No Todos")).toBeInTheDocument()
  })

  it("shows action buttons when there are todos", () => {
    const todos = [{ id: "1", title: "Test Todo", completed: false }]
    render(<TodoList {...baseProps} todos={todos} />)

    expect(screen.getByText("Mark All as Completed")).toBeInTheDocument()
    expect(screen.getByText("Delete All")).toBeInTheDocument()
  })
})

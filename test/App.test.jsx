import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react"
import '@testing-library/jest-dom'
import App from "../src/App"

beforeAll(() => {
  if (!crypto.randomUUID) {
    crypto.randomUUID = () => 'mock-uuid-1234';
  }
});


global.crypto = {
  randomUUID: () => 'test-id',
}

describe("App Integration Test", () => {
  beforeEach(() => {
    // clear localStorage to isolate test cases
    localStorage.clear()
  })

  it("adds a new todo item and renders it", () => {
    render(<App />)
    const input = screen.getByLabelText("New Item")   
    const form = input.closest("form")

    fireEvent.change(input, { target: { value: "Buy milk" } })
    fireEvent.submit(form)

    expect(screen.getByLabelText("Buy milk")).toBeInTheDocument()
    })

  it("toggles a todo item as completed", () => {
    render(<App />)
    const input = screen.getByLabelText("New Item")   
    const form = input.closest("form")

    fireEvent.change(input, { target: { value: "Buy milk" } })
    fireEvent.submit(form)

    const checkbox = screen.getByLabelText("Buy milk")
    fireEvent.click(checkbox)

    expect(checkbox).toBeChecked()
  })

  it("deletes a todo item", () => {
    render(<App />)
    const input = screen.getByLabelText("New Item")   
    const form = input.closest("form")

    fireEvent.change(input, { target: { value: "Buy milk" } })
    fireEvent.submit(form)

    const todoItem = screen.getByLabelText("Buy milk")
    expect(todoItem).toBeInTheDocument()
    fireEvent.mouseOver(todoItem)
    const deleteButton = screen.getByRole("button", { name: "Delete" })
    fireEvent.click(deleteButton)

    expect(screen.queryByLabelText("Buy milk")).not.toBeInTheDocument()
  })

  it("duplicates a todo item", () => {
    render(<App />)
    const input = screen.getByLabelText("New Item")   
    const form = input.closest("form")

    fireEvent.change(input, { target: { value: "Buy milk" } })
    fireEvent.submit(form)

    const duplicateButton = screen.getByRole("button", { name: "Duplicate" })
    fireEvent.click(duplicateButton)

    expect(screen.getAllByLabelText("Buy milk").length).toBe(2)
  })

  it("marks all todos as completed", () => {
    render(<App />)
    const input = screen.getByLabelText("New Item")   
    const form = input.closest("form")

    fireEvent.change(input, { target: { value: "Buy milk" } })
    fireEvent.submit(form)

    fireEvent.change(input, { target: { value: "Feed the dogs" } })
    fireEvent.submit(form)

    const markAllButton = screen.getByRole("button", { name: "Mark All as Completed" })
    fireEvent.click(markAllButton)

    const checkbox = screen.getByLabelText("Buy milk")
    expect(checkbox).toBeChecked()
    const checkbox2 = screen.getByLabelText("Feed the dogs")
    expect(checkbox2).toBeChecked()
  })

  it("deletes all todos", () => { 
    render(<App />)
    const input = screen.getByLabelText("New Item")   
    const form = input.closest("form")

    fireEvent.change(input, { target: { value: "Buy milk" } })
    fireEvent.submit(form)

    fireEvent.change(input, { target: { value: "Feed the dogs" } })
    fireEvent.submit(form)

    const deleteAllButton = screen.getByRole("button", { name: "Delete All" })
    fireEvent.click(deleteAllButton)

    expect(screen.queryByLabelText("Buy milk")).not.toBeInTheDocument()
    expect(screen.queryByLabelText("Feed the dogs")).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Delete All' })).not.toBeInTheDocument()
    expect(screen.queryByRole('button', { name: 'Mark All as Completed' })).not.toBeInTheDocument()
  })

})

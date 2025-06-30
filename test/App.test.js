import React from 'react';
import { render, screen, fireEvent, act } from "@testing-library/react"
import "@testing-library/jest-dom"
import App from "../src/App"
import { TestHookWrapper } from "./TestHookWrapper"

describe("App duplicate todo logic", () => {
    beforeAll(() => {
        if (!global.crypto) {
            global.crypto = {}
        }
        global.crypto.randomUUID = () => 'test-uuid-' + Math.random().toString(16).slice(2)
    })

  beforeEach(() => {
    localStorage.clear()
    jest.restoreAllMocks() // Jest's version of vi.restoreAllMocks()
  })

  it("adds a todo with a unique title", () => {
    render(<App />)

    const input = screen.getByLabelText("New item")
    const form = input.closest("form")

    fireEvent.change(input, { target: { value: "Buy milk" } })
    fireEvent.submit(form)

    expect(screen.getByLabelText("Buy milk")).toBeInTheDocument()
  })

  it("does not add an empty todo", () => {
    render(<App />)

    const input = screen.getByLabelText("New item")
    const form = input.closest("form")

    fireEvent.change(input, { target: { value: " " } })
    fireEvent.submit(form)

    expect(screen.queryByLabelText(" ")).not.toBeInTheDocument()
  })

  it("covers duplicateTodo branches", () => {
    let todosHook;
    render(<TestHookWrapper onReady={(hook) => { todosHook = hook }} />);

    act(() => {
      todosHook.addTodo("Test 1");
    });

    const existingId = todosHook.todos[0].id;

    act(() => {
      todosHook.duplicateTodo(existingId);
      todosHook.duplicateTodo("non-existent-id");
    });

    expect(todosHook.todos.length).toBe(2);
  });
})

import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import App from "../src/App"

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
 
})

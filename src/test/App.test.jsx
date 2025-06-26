import { render, screen, fireEvent } from "@testing-library/react"
import '@testing-library/jest-dom'
import App from "../App"

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

})

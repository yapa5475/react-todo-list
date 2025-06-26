import { render, screen, fireEvent } from "@testing-library/react"
import "@testing-library/jest-dom"
import App from "../App"

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

    const input = screen.getByLabelText("New Item")
    const form = input.closest("form")

    fireEvent.change(input, { target: { value: "Buy milk" } })
    fireEvent.submit(form)

    expect(screen.getByLabelText("Buy milk")).toBeInTheDocument()
  })

  it("does not add duplicate todo if user cancels confirm", () => {
    jest.spyOn(window, "confirm").mockReturnValue(false)

    render(<App />)

    const input = screen.getByLabelText("New Item")
    const form = input.closest("form")

    fireEvent.change(input, { target: { value: "Buy eggs" } })
    fireEvent.submit(form)
    expect(screen.getByLabelText("Buy eggs")).toBeInTheDocument()

    fireEvent.change(input, { target: { value: "Buy eggs" } })
    fireEvent.submit(form)

    const items = screen.getAllByLabelText("Buy eggs")
    expect(items.length).toBe(1)
  })

  it("adds duplicate todo if user confirms", () => {
    jest.spyOn(window, "confirm").mockReturnValue(true)

    render(<App />)

    const input = screen.getByLabelText("New Item")
    const form = input.closest("form")

    fireEvent.change(input, { target: { value: "Walk dog" } })
    fireEvent.submit(form)

    fireEvent.change(input, { target: { value: "Walk dog" } })
    fireEvent.submit(form)

    const items = screen.getAllByLabelText("Walk dog")
    expect(items.length).toBe(2)
  })
})

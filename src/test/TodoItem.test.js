import '@testing-library/jest-dom'  
import { render, screen, fireEvent } from "@testing-library/react";

import { TodoItem } from "../TodoItem"
import { useState } from "react"
import { deleteTodo } from "../TodoItem"


// Test wrapper to observe real UI changes
function TodoItemTestWrapper({ title = "Test Todo", completed = false }) {
debugger;
  const [isChecked, setIsChecked] = useState(completed);
  const [visible, setVisible] = useState(true);
  
  return (
    <TodoItem
      id="1"
      title={title}
      completed={isChecked}
      toggleTodo={(id, value) => setIsChecked(value)}
      deleteTodo={(value) => deleteTodo(value)}
      duplicateTodo={() => {}}
    />
  )
}

describe("TodoItem - UI integration", () => {
  console.log("Running TodoItem UI tests");

  it("renders the todo item with correct title", () => {
    render(<TodoItemTestWrapper title="Buy milk" />)
    expect(screen.getByLabelText("Buy milk")).toBeInTheDocument()
  })

  it("toggles checkbox and updates UI", () => {
    render(<TodoItemTestWrapper />)
    const checkbox = screen.getByRole("checkbox")
    expect(checkbox.checked).toBe(false)

    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(true)

    fireEvent.click(checkbox)
    expect(checkbox.checked).toBe(false)
  })

})

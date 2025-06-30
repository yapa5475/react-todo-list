import React from 'react';
import { render, screen, fireEvent } from "@testing-library/react"
import '@testing-library/jest-dom'
import App from "../src/App"

beforeAll(() => {
  if (!crypto.randomUUID) {
    crypto.randomUUID = () => 'mock-uuid-1234';
  }
});

beforeEach(() => {
  global.fetch = jest.fn((url, options) => {
    if (options?.method === "POST") {
      return Promise.resolve({
        json: () => Promise.resolve({ id: 123, title: "Mock Todo", completed: false })
      });
    }

    if (options?.method === "PATCH") {
      return Promise.resolve({
        json: () =>
          Promise.resolve({ id: 123, title: "Mock Todo", completed: true })
      });
    }

    if (options?.method === "DELETE") {
      return Promise.resolve({});
    }

    return Promise.resolve({
      json: () =>
        Promise.resolve([
          { id: 123, title: "Mock Todo", completed: false }
        ])
    });
  });
});

afterEach(() => {
  jest.resetAllMocks();
});


global.crypto = {
  randomUUID: () => 'test-id',
}

describe("App Integration Test", () => {
  beforeEach(() => {
    // clear localStorage to isolate test cases
    localStorage.clear()
  })

  it("adds a new todo item", async () => {
    render(<App />);
    
    const input = screen.getByLabelText(/new item/i);
    const form = input.closest("form");

    await act(async () => {
      fireEvent.change(input, { target: { value: "Learn React" } });
      fireEvent.submit(form);
    });

    expect(await screen.findByText("Learn React")).toBeInTheDocument();
  });

  it("toggles a todo's completed state", async () => {
    render(<App />);
    
    const checkbox = await screen.findByRole("checkbox");
    expect(checkbox).not.toBeChecked();

    await act(async () => {
      fireEvent.click(checkbox);
    });

    expect(checkbox).toBeChecked();
  });


  it("deletes a todo item", async () => {
  render(<App />);
  const todoCheckbox = await screen.findByRole("checkbox");
  const deleteButton = screen.getByText("Delete");

  // Simulate click
  fireEvent.click(deleteButton);

  // Assert it's gone
  expect(screen.queryByText("Mock Todo")).not.toBeInTheDocument();
});


  it("duplicates a todo item", async () => {
    render(<App />);
    
    const original = await screen.findByText("Mock Todo");
    const duplicateButton = screen.getByText(/duplicate/i);

    await act(async () => {
      fireEvent.click(duplicateButton);
    });

    const todos = await screen.findAllByText("Mock Todo");
    expect(todos.length).toBeGreaterThan(1);
  });


  it("marks all todos as completed", async () => {
    render(<App />);
    
    const markAllButton = screen.getByText(/mark all/i);

    await act(async () => {
      fireEvent.click(markAllButton);
    });

    const checkboxes = await screen.findAllByRole("checkbox");
    checkboxes.forEach(checkbox => expect(checkbox).toBeChecked());
  });


  it("deletes all todos", async () => {
    render(<App />);
    
    const deleteAllButton = screen.getByText(/delete all/i);

    await act(async () => {
      fireEvent.click(deleteAllButton);
    });

    const todo = screen.queryByText("Mock Todo");
    expect(todo).not.toBeInTheDocument();
  });

})

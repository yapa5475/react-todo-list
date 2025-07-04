import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { TodoItem } from '../src/components/TodoItem'

describe('TodoItem - Unit Tests', () => {
  const baseProps = {
    id: 'walk-the-dog',
    title: 'Walk the dog',
    completed: false,
    toggleTodo: jest.fn(),
    deleteTodo: jest.fn(),
    duplicateTodo: jest.fn()
  }

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('renders the correct title and checkbox state', () => {
    render(<TodoItem {...baseProps} />)

    const checkbox = screen.getByRole('checkbox')
    const label = screen.getByLabelText('Walk the dog')

    expect(checkbox.checked).toBe(false)
    expect(label).toBeInTheDocument()
  })

  it('calls toggleTodo with correct args when checkbox is clicked', () => {
    render(<TodoItem {...baseProps} />)

    const checkbox = screen.getByRole('checkbox')
    fireEvent.click(checkbox)

    expect(baseProps.toggleTodo).toHaveBeenCalledWith('walk-the-dog', true)
  })

  it('calls deleteTodo with correct ID when Delete is clicked', () => {
    render(<TodoItem {...baseProps} />)

    fireEvent.click(screen.getByText('Delete'))

    expect(baseProps.deleteTodo).toHaveBeenCalledWith('walk-the-dog')
  })

  it('calls duplicateTodo with correct title when Duplicate is clicked', () => {
    render(<TodoItem {...baseProps} />)

    fireEvent.click(screen.getByText('Duplicate'))

    expect(baseProps.duplicateTodo).toHaveBeenCalledWith('walk-the-dog')
  })
})

import React from 'react';

export function TodoItem({ completed, id, title, toggleTodo, deleteTodo, duplicateTodo }) {
  return (
    <li className="todo-item">
      <label>
        <input
          type="checkbox"
          checked={completed}
          onChange={e => toggleTodo(id, e.target.checked)}
        />
        {title}
      </label>
      <button onClick={() => deleteTodo(id)} className="btn btn-danger btn-hover">
        Delete
      </button>
      <button onClick={() => duplicateTodo(id)} className="btn btn-hover">
         Duplicate
      </button>

    </li>
  )
}

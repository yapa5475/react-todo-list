import { useState } from "react";
import PropTypes from "prop-types";

export function NewTodoForm({ onSubmit }) {
  const [newItem, setNewItem] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (!newItem.trim()) return;
    onSubmit(newItem.trim());
    setNewItem("");
  }

  return (
    <form onSubmit={handleSubmit} className="new-item-form">
      <div className="form-row">
        <label htmlFor="item">New item</label>
        <input
          id="item"
          type="text"
          placeholder="Type new todo"
          value={newItem}
          onChange={e => setNewItem(e.target.value)}
        />
      </div>
      <button className="btn">Add</button>
    </form>
  );
}

NewTodoForm.propTypes = {
  onSubmit: PropTypes.func.isRequired
};

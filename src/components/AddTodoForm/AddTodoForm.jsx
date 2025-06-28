import PropTypes from 'prop-types';
import { useState } from 'react';
import * as styles from '../../styles.css';

export default function AddTodoForm({ onAdd }) {
  const [text, setText] = useState('');
  const handleSubmit = e => {
    e.preventDefault();
    if (text.trim()) {
      onAdd(text.trim());
      setText('');
    }
  };
  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <input 
        className={styles.input}
        value={text}
        onChange={e => setText(e.target.value)}
        placeholder="Add a todo"
      />
      <button type="submit">Add</button>
    </form>
  );
}

AddTodoForm.propTypes = { onAdd: PropTypes.func.isRequired };

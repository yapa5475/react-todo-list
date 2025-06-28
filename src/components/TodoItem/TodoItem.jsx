import PropTypes from 'prop-types';
// import styles from './TodoItem.module.css';

export default function TodoItem({ todo, onToggle, onDelete }) {
  return (
    <li className={styles.item}>
      <label>
        <input type="checkbox" checked={todo.done} onChange={() => onToggle(todo.id)} />
        <span className={todo.done ? styles.done : ''}>{todo.text}</span>
      </label>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </li>
  );
}

TodoItem.propTypes = {
  todo: PropTypes.shape({
    id: PropTypes.number,
    text: PropTypes.string,
    done: PropTypes.bool,
  }).isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};

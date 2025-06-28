import PropTypes from 'prop-types';
import TodoItem from '../TodoItem/TodoItem';
// import styles from './TodoList.module.css';

export default function TodoList({ todos, onToggle, onDelete }) {
  return (
    <ul className={styles.list}>
      {todos.map(todo => (
        <TodoItem 
          key={todo.id} 
          todo={todo} 
          onToggle={onToggle} 
          onDelete={onDelete} 
        />
      ))}
    </ul>
  );
}

TodoList.propTypes = {
  todos: PropTypes.array.isRequired,
  onToggle: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
};
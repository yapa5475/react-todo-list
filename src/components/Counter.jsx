import PropTypes from "prop-types";

export function Counter({ todos }) {
  const completedCount = todos.reduce((acc, todo) => acc + (todo.completed ? 1 : 0), 0);
  return (
    <div className="counter">
      <h2>Tasks completed</h2>
      <p>Well done! You've completed {completedCount} task{completedCount !== 1 ? "s" : ""}</p>
    </div>
  );
}

Counter.propTypes = {
  todos: PropTypes.arrayOf(
    PropTypes.shape({ completed: PropTypes.bool.isRequired })
  ).isRequired,
};

export default Counter;
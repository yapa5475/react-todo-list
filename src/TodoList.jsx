import { TodoItem } from "./TodoItem"

export function TodoList({ todos, toggleTodo, deleteTodo, duplicateTodo, markAllAsCompleted, deleteAllTodos }) {
  const hasTodos = todos.length > 0

  return (
    <>
      {hasTodos && (
        <div className="button-group">
          <button className="btn" onClick={markAllAsCompleted}>Mark All as Completed</button>
          <button className="btn btn-danger btn-hover" onClick={deleteAllTodos}>Delete All</button>
        </div>
      )}

      <ul className="list">
        {!hasTodos && "No Todos"}
        {[...todos]
          .sort((a, b) => a.completed - b.completed)
          .map(todo => (
            <TodoItem
              {...todo}
              key={todo.id}
              toggleTodo={toggleTodo}
              deleteTodo={deleteTodo}
              duplicateTodo={duplicateTodo} />
          ))}
      </ul>
    </>
  )
}
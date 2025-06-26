import { TodoItem } from "./TodoItem"

export function TodoList({ todos, toggleTodo, deleteTodo, duplicateTodo, markAllAsCompleted, deleteAllTodos }) {
  return (
    <>
    
    <button className="btn" onClick={markAllAsCompleted}>Mark All as Completed</button>
    <button className="btn" onClick={deleteAllTodos}>Delete All</button>
    
    <ul className="list">
      {todos.length === 0 && "No Todos"}
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
    </ul></>
  )
}

// import { useTodos } from './hooks/useTodos';
import AddTodoForm from './components/AddTodoForm/AddTodoForm'
import TodoList from './components/TodoList/TodoList';
// import Counter from './components/Counter/Counter';
import './styles.css';

function App() {
  const { todos, addTodo, toggleTodo, deleteTodo } = useTodos();

  return (
    <div className="App">
      <h1>Todo App</h1>
      <AddTodoForm onAdd={addTodo} />
      <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      <Counter count={todos.length} />
    </div>
  );
}

export default App;
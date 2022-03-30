import { useState } from 'react';

export default function App() {
  const [activity, setActivity] = useState('');
  const [edit, setEdit] = useState({});
  const [todos, setTodos] = useState([]);
  const [message, setMessage] = useState('');

  function generateId() {
    return Date.now();
  }

  function saveTodoHandler(e) {
    e.preventDefault();

    if (!activity) {
      return setMessage('Activity form is required!');
    }

    setMessage('');

    if (edit.id) {
      const updatedTodo = {
        ...edit,
        // id: edit.id,
        activity,
      };

      const index = todos.findIndex((todo) => todo.id === edit.id);
      const updatedTodos = [...todos];
      updatedTodos[index] = updatedTodo;

      setTodos(updatedTodos);

      return CancelEditHandler();
    }

    setTodos([
      ...todos,
      {
        id: generateId(),
        activity,
        done: false,
      },
    ]);
    setActivity('');
  }

  function editTodoHandler(todo) {
    setActivity(todo.activity);
    setEdit(todo);
  }

  function CancelEditHandler() {
    setActivity('');
    setEdit({});
  }

  function removeTodoHandler(id) {
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);

    if (edit.id) {
      CancelEditHandler();
    }
  }

  function doneTodoHandler(todo) {
    const updatedTodo = {
      ...todo,
      done: todo.done ? false : true,
    };

    const index = todos.findIndex((cur) => cur.id === todo.id);
    const updatedTodos = [...todos];
    updatedTodos[index] = updatedTodo;

    setTodos(updatedTodos);
  }

  return (
    <div>
      <h1>Simple Todo List</h1>
      {message && <small style={{ color: 'red' }}>{message}</small>}
      <form onSubmit={saveTodoHandler}>
        <input type="text" placeholder="Activity name" value={activity} onChange={(e) => setActivity(e.target.value)} />
        <button type="submit">{edit.id ? 'Save' : 'Add'}</button>
        {edit.id && <button onClick={CancelEditHandler}>Cancel</button>}
      </form>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => {
            return (
              <li key={todo.id}>
                <input type="checkbox" checked={todo.done} onChange={doneTodoHandler.bind(this, todo)} />
                {todo.activity} ({todo.done ? 'Finish' : 'Unfinished'}) <button onClick={editTodoHandler.bind(this, todo)}>Edit</button>
                <button onClick={removeTodoHandler.bind(this, todo.id)}>Trash</button>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>
          <i>No todos.</i>
        </p>
      )}
    </div>
  );
}

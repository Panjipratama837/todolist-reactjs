const root = document.querySelector("#root");

function App() {
  const [activity, setActivity] = React.useState("");
  const [edit, setEdit] = React.useState(false);
  const [todos, setTodos] = React.useState([]);
  const [message, setMessage] = React.useState("");

  function generateID() {
    return Date.now();
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!activity) {
      return setMessage("Please enter an activity");
    }
    setMessage("");

    if (edit.id) {
      const updatedTodo = {
        ...edit,
        activity: activity,
        done: false,
      };

      const editTodoIndex = todos.findIndex((todo) => todo.id === edit.id);
      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = updatedTodo;
      setTodos(updatedTodos);
      return cancelHandler();
    }

    setTodos([...todos, { id: generateID(), activity, done: false }]);
    setActivity("");
  }

  function editTodoHandler(todo) {
    setActivity(todo.activity);
    setEdit(todo);
  }

  function cancelHandler() {
    setEdit({});
    setActivity("");
  }

  function doneHandler(todo) {
    const updatedTodo = {
      ...todo,
      done: todo.done ? false : true,
    };
    const editTodoIndex = todos.findIndex(
      (currentTodo) => currentTodo.id == todo.id
    );
    const updatedTodos = [...todos];
    updatedTodos[editTodoIndex] = updatedTodo;
    setTodos(updatedTodos);
  }

  return (
    <>
      <h1>Todo List</h1>
      {message && <p style={{ color: "red" }}>{message}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={activity}
          onChange={(event) => setActivity(event.target.value)}
        />
        <button type="submit">{edit.id ? "Update" : "Add"}</button>
        {edit.id && (
          <button type="submit" onClick={cancelHandler}>
            Cancel
          </button>
        )}
      </form>

      {todos.length > 0 ? (
        <ul>
          {todos.map((todo, index) => (
            <li key={index}>
              <input
                type="checkbox"
                checked={todo.done}
                onChange={doneHandler.bind(this, todo)}
              />
              {todo.activity}({todo.done ? "Done" : "Not Done"})
              <button onClick={editTodoHandler.bind(this, todo)}>Edit</button>
              {!edit.id && (
                <button
                  onClick={() => setTodos(todos.filter((_, i) => i !== index))}
                >
                  Delete
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p>No todos</p>
      )}
    </>
  );
}

ReactDOM.render(<App />, root);

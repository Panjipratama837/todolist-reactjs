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
      const updatedTodo = { ...edit,
        activity: activity,
        done: false
      };
      const editTodoIndex = todos.findIndex(todo => todo.id === edit.id);
      const updatedTodos = [...todos];
      updatedTodos[editTodoIndex] = updatedTodo;
      setTodos(updatedTodos);
      return cancelHandler();
    }

    setTodos([...todos, {
      id: generateID(),
      activity,
      done: false
    }]);
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
    const updatedTodo = { ...todo,
      done: todo.done ? false : true
    };
    const editTodoIndex = todos.findIndex(currentTodo => currentTodo.id == todo.id);
    const updatedTodos = [...todos];
    updatedTodos[editTodoIndex] = updatedTodo;
    setTodos(updatedTodos);
  }

  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("h1", null, "Todo List"), message && /*#__PURE__*/React.createElement("p", {
    style: {
      color: "red"
    }
  }, message), /*#__PURE__*/React.createElement("form", {
    onSubmit: handleSubmit
  }, /*#__PURE__*/React.createElement("input", {
    type: "text",
    value: activity,
    onChange: event => setActivity(event.target.value)
  }), /*#__PURE__*/React.createElement("button", {
    type: "submit"
  }, edit.id ? "Update" : "Add"), edit.id && /*#__PURE__*/React.createElement("button", {
    type: "submit",
    onClick: cancelHandler
  }, "Cancel")), todos.length > 0 ? /*#__PURE__*/React.createElement("ul", null, todos.map((todo, index) => /*#__PURE__*/React.createElement("li", {
    key: index
  }, /*#__PURE__*/React.createElement("input", {
    type: "checkbox",
    checked: todo.done,
    onChange: doneHandler.bind(this, todo)
  }), todo.activity, "(", todo.done ? "Done" : "Not Done", ")", /*#__PURE__*/React.createElement("button", {
    onClick: editTodoHandler.bind(this, todo)
  }, "Edit"), !edit.id && /*#__PURE__*/React.createElement("button", {
    onClick: () => setTodos(todos.filter((_, i) => i !== index))
  }, "Delete")))) : /*#__PURE__*/React.createElement("p", null, "No todos"));
}

ReactDOM.render( /*#__PURE__*/React.createElement(App, null), root);
var todos = [];

window.setTimeout(function() {
  var cmd = prompt("What would you like to do?");

  while (cmd !== "quit") {
    if (cmd === "new") {
      addTodo();
    } else if (cmd === "list") {
      listTodos();
    } else if (cmd === "delete") {
      deleteTodo();
    }

    cmd = prompt("What would you like to do?");
  }
}, 500);

function addTodo() {
  var newTodo = prompt("Enter a new todo");
  todos.push(newTodo);
  console.log("Todo added");
}

function listTodos() {
  console.log("===================");
  todos.forEach(function(todo, i) {
    console.log(i + ": " + todo);
  });

  console.log("===================");
}

function deleteTodo() {
  var index = prompt("Enter the index of the todo you want to delete");
  todos.splice(index, 1);
  console.log("Todo " + index + " deleted");
}

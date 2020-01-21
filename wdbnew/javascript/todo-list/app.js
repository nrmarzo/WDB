window.setTimeout(function() {
  var todos = [];
  var cmd = prompt("What would you like to do?");

  while (cmd !== "quit") {
    if (cmd === "new") {
      var newTodo = prompt("Enter a new todo");
      todos.push(newTodo);
    } else if (cmd === "list") {
      todos.forEach(function(todo) {
        console.log(todo);
      });
      // for (var i = 0; i < todos.length; i++) {
      //   console.log(todos[i]);
      // }
    }

    cmd = prompt("What would you like to do?");
  }
}, 500);

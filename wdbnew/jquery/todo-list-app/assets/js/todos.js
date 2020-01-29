// Check off specific todos by clicking
$("ul").on("click", "li", function() {
  $(this).toggleClass("completed");
});

// Click on X to delete Todo
$("ul").on("click", ".delete", function(event) {
  $(this)
    .parent()
    .fadeOut(function() {
      $(this).remove();
    });
  event.stopPropagation();
});

$("input[type='text']").keypress(function(event) {
  if (event.which === 13) {
    var newTodo = $(this).val();
    $(this).val("");
    $("ul").append(
      "<li><span class='delete'><i class='far fa-trash-alt'></i></span> " +
        newTodo +
        "</li>"
    );
  }
});

$(".fa-plus").click(function() {
  $("input[type='text']").fadeToggle();
});

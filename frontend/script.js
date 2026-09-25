const todoList = document.getElementById("todo-container");
// const addTodoForm = document.getElementById("add-todo-form");
const body = document.getElementsByTagName('body');

const addTodoModal = document.getElementById("add-todo");


const todos = [
  {
    title: "Racing",
    description: "Join a Go-Kart racing tourney",
    _status: "Incomplete",
  },
  {
    title: "Study",
    description: "Study for the upcoming tests",
    _status: "Complete",
  },
  {
    title: "Record song sample",
    description: "Go to recording studio to get your verse recorded",
    _status: "Incomplete",
  },
  {
    title: "Charge my phone",
    description: "Place your phone on charge",
    _status: "Incomplete",
  },
  {
    title: "Lunch",
    description: "Have lunch with your family",
    _status: "Complete",
  },
  {
    title: "Reading",
    description: "Read the Great Gatsby",
    _status: "Incomplete",
  },
];

function renderTodos() {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");
    todoItem.innerHTML = `
      <div class="details">
        <h3 class="title">${todo.title}</h3>
        <div class="description">${todo.description}</div>
        <div class="status">${todo._status}</div>
      </div>
      <input type="checkbox" ${todo._status === "Complete" ? "checked" : ""}>
    `;
    todoList.appendChild(todoItem);
  });
}

renderTodos();

function showModal(){
  addTodoModal.style.display = "block";
}
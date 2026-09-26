const todoList = document.getElementById("todo-container");
const addTodoBtn = document.getElementById("add-todo");
const modal = document.querySelector(".modal");
const closeModalBtn = document.querySelector(".close");
closeModalBtn.addEventListener("click", hideModal);
addTodoBtn.addEventListener("click", showModal);

function renderTodos(todos) {
  todoList.innerHTML = "";

  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item", todo.completed ? "completed" : "incomplete");

    const details = document.createElement("div");
    details.classList.add("details");
    const title = document.createElement("h3");
    title.classList.add("title");
    title.textContent = todo.title;
    const description = document.createElement("div");
    description.classList.add("description");
    description.textContent = todo.description;
    const status = document.createElement("div");
    status.classList.add("status");
    status.textContent = todo.completed ? "Complete" : "Incomplete";
    details.append(title, description, status);

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.disabled = true;
    checkbox.setAttribute("aria-label", `Mark ${todo.title} complete`);

    todoItem.append(details, checkbox);
    todoList.appendChild(todoItem);
  });
}

async function loadTodos() {
  try {
    const response = await fetch("http://127.0.0.1:8000/todos");
    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }
    renderTodos(await response.json());
  } catch (error) {
    todoList.textContent = "Unable to load todos. Start the FastAPI server and refresh.";
    console.error(error);
  }
}

loadTodos();

function showModal(){
  modal.style.display = "grid";
}

function hideModal(){
  modal.style.display = "none";
}
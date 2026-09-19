const STORAGE_KEY = "offline-todo-items";

const form = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");
const emptyState = document.querySelector("#empty-state");
const remainingCount = document.querySelector("#remaining-count");
const themeToggle = document.querySelector("#theme-toggle");
const filterButtons = document.querySelectorAll(".filter-button");
const clearCompletedButton = document.querySelector("#clear-completed-button");

let todos = loadTodos();
let currentFilter = "all";
const themeMediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

// 讀取使用者偏好，沒有手動設定時就使用作業系統的主題。
function getInitialTheme() {
  return localStorage.getItem("offline-todo-theme") || (themeMediaQuery.matches ? "dark" : "light");
}

function applyTheme(theme) {
  document.body.dataset.theme = theme;
  themeToggle.textContent = theme === "dark" ? "☀️ 淺色模式" : "🌙 深色模式";
  themeToggle.setAttribute("aria-label", theme === "dark" ? "切換至淺色模式" : "切換至深色模式");
}

// 將儲存的資料載入清單，遇到損壞資料時回到空清單。
function loadTodos() {
  try {
    const savedTodos = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return Array.isArray(savedTodos) ? savedTodos : [];
  } catch (error) {
    return [];
  }
}

// 將目前清單保存到瀏覽器的本機儲存空間。
function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function getVisibleTodos() {
  if (currentFilter === "active") {
    return todos.filter((todo) => !todo.completed);
  }
  if (currentFilter === "completed") {
    return todos.filter((todo) => todo.completed);
  }
  return todos;
}

function updateEmptyState(visibleTodos) {
  const messages = {
    all: "還沒有任何待辦事項,新增一個吧!",
    active: "目前沒有未完成的待辦事項。",
    completed: "目前沒有已完成的待辦事項。"
  };
  emptyState.textContent = messages[currentFilter];
  emptyState.hidden = visibleTodos.length > 0;
}

// 重新繪製畫面並同步未完成數量與空狀態提示。
function renderTodos() {
  todoList.replaceChildren();

  const visibleTodos = getVisibleTodos();
  visibleTodos.forEach((todo) => {
    const item = document.createElement("li");
    item.className = `todo-item${todo.completed ? " is-completed" : ""}`;

    const checkbox = document.createElement("input");
    checkbox.className = "todo-checkbox";
    checkbox.type = "checkbox";
    checkbox.checked = todo.completed;
    checkbox.setAttribute("aria-label", `標記「${todo.text}」為${todo.completed ? "未完成" : "已完成"}`);
    checkbox.addEventListener("change", () => toggleTodo(todo.id));

    const text = document.createElement("span");
    text.className = "todo-text";
    text.textContent = todo.text;

    const deleteButton = document.createElement("button");
    deleteButton.className = "delete-button";
    deleteButton.type = "button";
    deleteButton.textContent = "刪除";
    deleteButton.setAttribute("aria-label", `刪除「${todo.text}」`);
    deleteButton.addEventListener("click", () => deleteTodo(todo.id));

    item.append(checkbox, text, deleteButton);
    todoList.append(item);
  });

  const unfinishedCount = todos.filter((todo) => !todo.completed).length;
  const hasCompletedTodos = todos.some((todo) => todo.completed);
  remainingCount.textContent = `未完成：${unfinishedCount} 項`;
  clearCompletedButton.disabled = !hasCompletedTodos;
  updateEmptyState(visibleTodos);
}

function addTodo(text) {
  todos.push({
    id: `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    text,
    completed: false
  });
  saveTodos();
  renderTodos();
}

function toggleTodo(id) {
  todos = todos.map((todo) => (
    todo.id === id ? { ...todo, completed: !todo.completed } : todo
  ));
  saveTodos();
  renderTodos();
}

function deleteTodo(id) {
  todos = todos.filter((todo) => todo.id !== id);
  saveTodos();
  renderTodos();
}

function clearCompletedTodos() {
  if (!todos.some((todo) => todo.completed)) {
    return;
  }

    const shouldClear = window.confirm("已完成的待辦事項將被永久刪除，確定要清除嗎？");
  if (!shouldClear) {
    return;
  }

  todos = todos.filter((todo) => !todo.completed);
  saveTodos();
  renderTodos();
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = input.value.trim();

  if (!text) {
    input.focus();
    return;
  }

  addTodo(text);
  input.value = "";
  input.focus();
});

themeToggle.addEventListener("click", () => {
  const nextTheme = document.body.dataset.theme === "dark" ? "light" : "dark";
  localStorage.setItem("offline-todo-theme", nextTheme);
  applyTheme(nextTheme);
});

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentFilter = button.dataset.filter;
    filterButtons.forEach((filterButton) => {
      filterButton.classList.toggle("is-active", filterButton === button);
      filterButton.setAttribute("aria-pressed", filterButton === button ? "true" : "false");
    });
    renderTodos();
  });
});

clearCompletedButton.addEventListener("click", clearCompletedTodos);

if (!localStorage.getItem("offline-todo-theme")) {
  themeMediaQuery.addEventListener("change", (event) => applyTheme(event.matches ? "dark" : "light"));
}

applyTheme(getInitialTheme());
renderTodos();

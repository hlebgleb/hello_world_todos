const input = document.getElementById('taskInput');
const addButton = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Загружаем задачи из localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => renderTask(task));

// Добавление задачи
function addTask() {
  const taskText = input.value.trim();
  if (taskText === "") return;

  const task = {
    id: Date.now(),
    text: taskText,
    done: false
  };

  tasks.push(task);
  saveTasks();
  renderTask(task);
  input.value = "";
}

// Отображение задачи в DOM
function renderTask(task) {
  const li = document.createElement("li");
  li.className = "task";
  li.dataset.id = task.id;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = task.done;
  checkbox.addEventListener("change", () => {
    task.done = checkbox.checked;
    saveTasks();
    textSpan.classList.toggle("done", task.done);
  });

  const textSpan = document.createElement("span");
  textSpan.textContent = task.text;
  if (task.done) textSpan.classList.add("done");

  const removeBtn = document.createElement("button");
  removeBtn.className = "deleteBtn";
  removeBtn.textContent = "Удалить";
  removeBtn.addEventListener("click", () => {
    tasks = tasks.filter(t => t.id !== task.id);
    saveTasks();
    li.remove();
  });

  li.appendChild(checkbox);
  li.appendChild(textSpan);
  li.appendChild(removeBtn);
  taskList.appendChild(li);
}

// Сохраняем в localStorage
function saveTasks() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Обработчик кнопки
addButton.addEventListener('click', addTask);

// Обработчик Enter
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    addTask();
  }
});

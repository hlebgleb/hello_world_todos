const input = document.getElementById('taskInput');
const addButton = document.getElementById('addTaskBtn');
const taskList = document.getElementById('taskList');

// Загружаем задачи из localStorage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
tasks.forEach(task => renderTask(task));

// Добавление задачи
function addTask() {
  const taskText = input.value.trim();
  if (taskText === '') return;

  const task = {
    id: Date.now(), // уникальный идентификатор
    text: taskText
  };

  tasks.push(task);
  saveTasks();
  renderTask(task);
  input.value = '';
}

// Отображение задачи в DOM
function renderTask(task) {
  const li = document.createElement('li');
  li.className = 'task';
  li.dataset.id = task.id;

  li.innerHTML = `
    <span>${task.text}</span>
    <button class="deleteBtn">Удалить</button>
  `;

  li.querySelector('.deleteBtn').addEventListener('click', () => {
    tasks = tasks.filter(t => t.id !== task.id); // удаляем по id
    saveTasks();
    li.remove();
  });

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

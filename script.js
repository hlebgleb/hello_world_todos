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

  tasks.push(taskText);
  saveTasks();
  renderTask(taskText);
  input.value = '';
}

// Отображение задачи в DOM
function renderTask(taskText) {
  const li = document.createElement('li');
  li.className = 'task';
  li.innerHTML = `
    <span>${taskText}</span>
    <button class="deleteBtn">Удалить</button>
  `;
  taskList.appendChild(li);

  li.querySelector('.deleteBtn').addEventListener('click', () => {
    tasks = tasks.filter(t => t !== taskText);
    saveTasks();
    li.remove();
  });
}

// Сохраняем задачи в localStorage
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

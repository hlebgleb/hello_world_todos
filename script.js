function addTask() {
    const input = document.getElementById("taskInput");
    const taskText = input.value.trim();
  
    if (taskText === "") return;
  
    const li = document.createElement("li");
  
    // Создаем контейнер
    const taskContainer = document.createElement("div");
    taskContainer.className = "task-item";
  
    const span = document.createElement("span");
    span.textContent = taskText;
  
    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Удалить";
    removeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      li.remove();
    });
  
    taskContainer.appendChild(span);
    taskContainer.appendChild(removeBtn);
    li.appendChild(taskContainer);
  
    li.addEventListener("click", () => {
      li.classList.toggle("done");
    });
  
    document.getElementById("taskList").appendChild(li);
    input.value = "";
  }

  document.getElementById("taskInput").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      addTask();
    }
  });
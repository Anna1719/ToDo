import { Task } from "./Task.js";

//Класс таск менеджера позволяет работать с задачами

export class TaskManager {
  constructor() {
    this.tasks = this.loadTasks(); 
    this.taskListElement = document.getElementById("task-list");
    this.filterSelect = document.getElementById("filter-tasks");

    this.filterSelect.addEventListener("change", () => this.renderTasks());
  }

  // Сохраняем задачи в localStorage
  saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(this.tasks));
  }

  // Загружаем задачи из localStorage
  loadTasks() {
    const tasks = localStorage.getItem("tasks");
    return tasks
      ? JSON.parse(tasks).map((task) => new Task(task.text, task.checked))
      : [];
  }

  addTask(taskText) {
    const task = new Task(taskText);
    this.tasks.push(task);
    this.saveTasks();
    this.renderTasks();
  }

  removeTask(index) {
    this.tasks.splice(index, 1);
    this.saveTasks();
    this.renderTasks();
  }

  toggleTaskCompletion(index) {
    this.tasks[index].toggleChecked();
    this.saveTasks();
    this.renderTasks();
  }

  getFilteredTasks() {
    const filter = this.filterSelect.value;

    if (filter === "completed") {
      return this.tasks.filter((task) => task.checked);
    } else if (filter === "active") {
      return this.tasks.filter((task) => !task.checked);
    }
    return this.tasks;
  }

  renderTasks() {
    this.taskListElement.innerHTML = "";
    const filteredTasks = this.getFilteredTasks();

    filteredTasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.classList.add(task.checked ? "checked" : "unchecked");

      li.addEventListener('click', () => this.toggleTaskCompletion(index));

      const taskText = document.createElement('span');
      taskText.textContent = task.text;

      const deleteButton = document.createElement("button");
      deleteButton.addEventListener('click', (e) => {
        e.stopPropagation();
        this.removeTask(index);
      });

      li.appendChild(taskText);
      li.appendChild(deleteButton);
      this.taskListElement.appendChild(li);
    });
  }
}

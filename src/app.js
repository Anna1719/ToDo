import { TaskManager } from "./taskManager.js";

class App {
  constructor() {
    this.taskManager = new TaskManager();
    this.taskInput = document.getElementById("input-text");
    this.addTaskButton = document.getElementById("add-btn");

    this.addTaskButton.addEventListener("click", () => this.handleAddTask());
    this.taskManager.renderTasks();
  }

  handleAddTask() {
    const taskText = this.taskInput.value.trim();

    if (taskText) {
      this.taskManager.addTask(taskText);
      this.taskInput.value = "";
    }
  }
}

document.addEventListener("DOMContentLoaded", () => {
  new App();
});

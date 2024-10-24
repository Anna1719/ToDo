//Класс задачи

export class Task {
  constructor(text) {
    this.text = text;
    this.checked = false;
  }

  toggleChecked() {
    this.checked = !this.checked;
  }
}

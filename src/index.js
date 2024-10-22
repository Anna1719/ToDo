const newTask = document.getElementById('input-text');
const addTaskBtn = document.getElementById('add-btn');
const taskList = document.getElementById('task-list');

// Получаем задачи из localStorage
function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        createTaskElement(task.text, task.checked);
    });
}

// Сохранение задач в localStorage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll('#task-list li').forEach(li => {
        tasks.push({
            text: li.firstChild.textContent,
            checked: li.classList.contains('checked')
        });
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Функция для создания и добавления задачи в DOM
function createTaskElement(taskText, checked = false) {
    const li = document.createElement('li');
    li.textContent = taskText;

    // Если задача отмечена, навешиваем стиль
    if (checked) {
        li.classList.add('checked');
    }

    // Кнопка для удаления задачи
    const deleteBtn = document.createElement('button');
    deleteBtn.addEventListener('click', () => {
        taskList.removeChild(li);
        saveTasks();
    });

    // Вешаем слушатель на задачу
    li.addEventListener('click', () => {
        li.classList.toggle('checked');
        saveTasks(); 
    });

    // Добавляем кнопку удаления и саму задачу в список
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
}

// Функция для добавления новой задачи
function addTask() {
    const taskText = newTask.value.trim();
    if (taskText === '') return; // Пустое поле не добавляем

    createTaskElement(taskText);
    saveTasks(); 

    newTask.value = '';
}

addTaskBtn.addEventListener('click', addTask);

window.addEventListener('load', loadTasks);
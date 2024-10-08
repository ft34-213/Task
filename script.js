document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const filters = document.querySelectorAll('.filter');
  
    let tasks = [];
  
    taskForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const taskText = taskInput.value.trim();
      if (taskText) {
        tasks.push({ text: taskText, completed: false });
        taskInput.value = '';
        renderTasks();
      }
    });
  
    taskList.addEventListener('click', (e) => {
      if (e.target.classList.contains('delete-task')) {
        const index = e.target.dataset.index;
        tasks.splice(index, 1);
        renderTasks();
      }
  
      if (e.target.classList.contains('toggle-complete')) {
        const index = e.target.dataset.index;
        tasks[index].completed = !tasks[index].completed;
        renderTasks();
      }
    });
  
    filters.forEach((filter) => {
      filter.addEventListener('click', () => {
        renderTasks(filter.dataset.filter);
      });
    });
  
    function renderTasks(filter = 'all') {
      taskList.innerHTML = '';
      tasks
        .filter((task) => {
          if (filter === 'all') return true;
          return filter === 'completed' ? task.completed : !task.completed;
        })
        .forEach((task, index) => {
          const taskItem = document.createElement('li');
          taskItem.className = task.completed ? 'completed' : '';
          taskItem.innerHTML = `
            ${task.text}
            <button class="toggle-complete" data-index="${index}">
              ${task.completed ? 'Undo' : 'Complete'}
            </button>
            <button class="delete-task" data-index="${index}">Delete</button>
          `;
          taskList.appendChild(taskItem);
        });
    }
  });
  
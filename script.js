// Task data
let tasks = [];
let filterStatus = 'all';  // Variable to store the current filter status

// Function to add a new task
const addTask = (task) => {
  tasks.push({ text: task, completed: false });
  renderTaskList();
};

// Function to toggle task completion
const toggleTaskCompletion = (index) => {
  tasks[index].completed = !tasks[index].completed;
  renderTaskList();
};

// Function to delete a task
const deleteTask = (index) => {
  tasks.splice(index, 1);
  renderTaskList();
};

// Function to edit a task
const editTask = (index) => {
  const newText = prompt('Enter new task text:', tasks[index].text);
  if (newText !== null && newText.trim() !== '') {
    tasks[index].text = newText;
    renderTaskList();
  }
};

// Function to filter tasks by status
const filterTasks = (status) => {
  filterStatus = status;
  renderTaskList();
};

// Function to render the task list
const renderTaskList = () => {
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  let filteredTasks = tasks;
  if (filterStatus === 'completed') {
    filteredTasks = tasks.filter(task => task.completed);
  } else if (filterStatus === 'pending') {
    filteredTasks = tasks.filter(task => !task.completed);
  }

  filteredTasks.forEach((task, index) => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    if (task.completed) taskElement.classList.add('completed');
    taskElement.innerHTML = `
      <input type="checkbox" ${task.completed ? 'checked' : ''} data-index="${index}">
      <span>${task.text}</span>
      <button class="edit-btn" data-index="${index}">Edit</button>
      <button class="delete-btn" data-index="${index}">Delete</button>
    `;
    taskList.appendChild(taskElement);
  });
};

// Event listeners
document.getElementById('add-task-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const taskInput = document.getElementById('task-input');
  if (taskInput.value.trim()) {
    addTask(taskInput.value);
  }
  taskInput.value = '';
});

document.getElementById('task-list').addEventListener('click', (e) => {
  if (e.target.type === 'checkbox') {
    const index = e.target.dataset.index;
    toggleTaskCompletion(index);
  } else if (e.target.classList.contains('edit-btn')) {
    const index = e.target.dataset.index;
    editTask(index);
  } else if (e.target.classList.contains('delete-btn')) {
    const index = e.target.dataset.index;
    deleteTask(index);
  }
});

document.getElementById('all-btn').addEventListener('click', () => {
  filterTasks('all');
  setActiveButton('all-btn');
});

document.getElementById('completed-btn').addEventListener('click', () => {
  filterTasks('completed');
  setActiveButton('completed-btn');
});

document.getElementById('pending-btn').addEventListener('click', () => {
  filterTasks('pending');
  setActiveButton('pending-btn');
});

// Function to set the active button
const setActiveButton = (buttonId) => {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  document.getElementById(buttonId).classList.add('active');
};

// Initial render
renderTaskList();

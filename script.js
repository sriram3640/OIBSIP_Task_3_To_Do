var pendingTasksList = document.getElementById('pending-tasks-list');
var completedTasksList = document.getElementById('completed-tasks-list');

function addTask() {
  var taskInput = document.getElementById('task-input');
  var descriptionInput = document.getElementById('description-input');

  var taskTitle = taskInput.value.trim();
  var taskDescription = descriptionInput.value.trim();

  if (taskTitle !== '') {
    var taskItem = document.createElement('li');
    taskItem.innerHTML = `
      <div>
        <h3>${taskTitle}</h3>
        <p>${taskDescription}</p>
        <span class="timestamp">Added on ${getFormattedDateTime()}</span>
      </div>
      <div class="actions">
        <button id="complete" onclick="completeTask(this.parentNode.parentNode)">Complete</button>
        <button id="delete" onclick="deleteTask(this.parentNode.parentNode)">Delete</button>
        <button id="edit" onclick="editTask(this.parentNode.parentNode)">Edit</button>
      </div>
    `;
    pendingTasksList.appendChild(taskItem);

    taskInput.value = '';
    descriptionInput.value = '';
  }
}

function completeTask(taskItem) {
  taskItem.querySelector('.timestamp').innerHTML = `Completed on ${getFormattedDateTime()}`;
  taskItem.querySelector('.actions').innerHTML = `
    <button id="delete" onclick="deleteTask(this.parentNode.parentNode)">Delete</button>
  `;
  completedTasksList.appendChild(taskItem);
}

function editTask(taskItem) {
  var taskTitle = taskItem.querySelector('h3');
  var taskDescription = taskItem.querySelector('p');

  var newTitle = prompt('Enter new title:', taskTitle.textContent);
  var newDescription = prompt('Enter new description:', taskDescription.textContent);

  if (newTitle !== null && newDescription !== null) {
    taskTitle.textContent = newTitle;
    taskDescription.textContent = newDescription;
  }
}

function deleteTask(taskItem) {
  taskItem.parentNode.removeChild(taskItem);
}

function getFormattedDateTime() {
  var currentDateTime = new Date();
  var options = { year: 'numeric', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' };
  return currentDateTime.toLocaleDateString('en-US', options);
}

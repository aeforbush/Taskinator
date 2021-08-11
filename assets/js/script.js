// Whole form event listener
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// Creating a task item function
var createTaskHandler = function(event) {
    event.preventDefault();
    // Find value for task name
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // Find value for task type
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // Create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // Createa div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // Give it a class name
    taskInfoEl.className = "task-info";
    // Add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskNameInput + "</h3><span class='task-type'>" + taskTypeInput + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // Add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
    console.dir(listItemEl);
  };

// Event Listener
formEl.addEventListener("submit", createTaskHandler);

// Ability to read and store users input







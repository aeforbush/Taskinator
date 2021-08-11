// Whole form event listener
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// Creating a task item function
var taskFormHandler = function(event) {
    event.preventDefault();
    // Find value for task name
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // Find value for task type
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // Package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);


   
  };
  // Function to accept the form values as arguments and use them to create the new task item's HTML
  var createTaskEl = function(taskDataObj) {
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

  }

// Event Listener
formEl.addEventListener("submit", taskFormHandler);

// Ability to read and store users input




// One function to handle the form submission, get the form values, and pass those values to another function as arguments




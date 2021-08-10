// Whole form event listener
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

// Creating a task item function
var createTaskHandler = function(event) {
    event.preventDefault();
    
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";
    listItemEl.textContent = "This is a new task.";
    tasksToDoEl.appendChild(listItemEl);
  };
  
 

// Event Listener
formEl.addEventListener("submit", createTaskHandler);






// Whole form event listener
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var taskIdCounter = 0;
var pageContentEl = document.querySelector("#page-content");

// Creating a task item function
var taskFormHandler = function(event) {
    event.preventDefault();
    // Find value for task name
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // Find value for task type
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // Check if input values are empty strings
    if (taskNameInput === "" || taskTypeInput === "") {
      alert("You need to fill out the task form!");
      return false;
    }
    
    // Reset form
    formEl.reset();

    // Reset form fields for next task to be entered
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;

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

    // Add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // Create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // Give it a class name
    taskInfoEl.className = "task-info";
    // Add HTML content to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";
    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    // Add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    // Increase task counter for next unqiue id
    taskIdCounter++;
  };
  // Creating task ids
  var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";
    
    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);

    actionContainerEl.appendChild(deleteButtonEl);

    // Dropdown
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    // Create dropdown options array
    var statusChoices = ["To Do", "In Progress", "Completed"];

    for (var i = 0; i < statusChoices.length; i++) {
    // create option element
    var statusOptionEl = document.createElement("option");
    statusOptionEl.textContent = statusChoices[i];
    statusOptionEl.setAttribute("value", statusChoices[i]);
    
    // append to select
    statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    // Return statement
    return actionContainerEl;
  };

    var taskButtonHandler = function(event) {
    //console.log(event.target);

    if (event.target.matches(".delete-btn")) {
      // get the element's task id
      var taskId = event.target.getAttribute("data-task-id");
      //console.log(taskId);
      }
      if (event.target.matches(".delete-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
      }
   
    // get target element from event
    var targetEl = event.target;

    // edit button was clicked
    if (targetEl.matches(".edit-btn")) {
      var taskId = targetEl.getAttribute("data-task-id");
      editTask(taskId);
    }
    //delete button was clicked
    else if (targetEl.matches(".delete-btn")) {
      var taskId = targetEl.getAttribute("data-task-id");
    }
  };

    // function for editing
    var editTask = function(taskId) {
      //console.log("editing task #" + taskId);

      // get task list item element
      var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

      // get content from task name and type
      var taskName = taskSelected.querySelector("h3.task-name").textContent;
      

      var taskType = taskSelected.querySelector("span.task-type").textContent;
      document.querySelector("input[name='task-name']").value = taskName;
      document.querySelector("select[name='task-type']").value = taskType;

      // save task
      document.querySelector("#save-task").textContent = "Save Task";

      // ???
      formEl.setAttribute("data-task-id", taskId);
    };

    var deleteTask = function(taskId) {
      var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
      taskSelected.remove();
  };


    // Event Listener
    formEl.addEventListener("submit", taskFormHandler);
    pageContentEl.addEventListener("click", taskButtonHandler);

// Ability to read and store users input




// One function to handle the form submission, get the form values, and pass those values to another function as arguments




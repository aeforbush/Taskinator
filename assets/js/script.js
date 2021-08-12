// Whole form event listener
var taskIdCounter = 0;

var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var pageContentEl = document.querySelector("#page-content");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

// array variable
var tasks =[];

// Creating a task item function
var taskFormHandler = function(event) {
    event.preventDefault();
    // Find value for task name
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // Find value for task type
    var taskTypeInput = document.querySelector("select[name='task-type']").value;

    // check if input values are empty strings
    if (taskNameInput === "" || taskTypeInput === "") {
      alert("You need to fill out the task form!");
      return false;
    }
    
    // Reset form
    // formEl.reset();

    // Reset form fields for next task to be entered
    document.querySelector("input[name='task-name']").value = "";
    document.querySelector("select[name='task-type']").selectedIndex = 0;

    var isEdit = formEl.hasAttribute("data-task-id");

    // has data attribute, so get task id and call function to complete edit process
    if (isEdit) {
      var taskId = formEl.getAttribute("data-task-id");
      completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    // no data attribute, so create object as normal and pass to createTaskEl function
    else {
      var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput,
        status: "to do"
      };
    
    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
  }
};

  // Function to accept the form values as arguments and use them to create the new task item's HTML
  var createTaskEl = function(taskDataObj) {
    // Create list item
    console.log(taskDataObj);
    console.log(taskDataObj.status);

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

    //create task actions (buttons and select) for task
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    // Add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    //???
    taskDataObj.id = taskIdCounter;
    tasks.push(taskDataObj);

    // Increase task counter for next unqiue id
    taskIdCounter++;
  };

  // Creating task ids
  var createTaskActions = function(taskId) {
    // create container to hold elements
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
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    statusSelectEl.className = "select-status";
    actionContainerEl.appendChild(statusSelectEl);
   
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
    // Return statement
    return actionContainerEl;
  };

  var completeEditTask = function(taskName, taskType, taskId) {
    // find task list item with taskId value
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    // loop through tasks array and task object with new content
    for (var i = 0; i < tasks.length; i++) {
      if (tasks[i].id === parseInt(taskId)) {
        tasks[i].name = taskName;
        tasks[i].type = taskType;
      }
    };

    alert("Task Updated!");

    // remove data attribute from form
    formEl.removeAttribute("data-task-id");
    // update formEl button to go back to saying "Add Task" instead of "Edit Task"
    document.querySelector("#save-task").textContent = "Add Task";
};

    var taskButtonHandler = function(event) {
    //console.log(event.target);
    // get target element from event
    var targetEl = event.target

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
    // ???
    var taskStatusChangeHandler = function(event) {
  
    // find task list item based on event.target's data-task-id attribute
    var taskId = event.target.getAttribute("data-task-id");

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
  
    // get the currently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();
  
      if (statusValue === "to do") {
          tasksToDoEl.appendChild(taskSelected);
      } else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
      }
      else if (statusValue === "completed") {
          tasksCompletedEl.appendChild(taskSelected);
      }

      // update task's in the tasks array
      for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(taskId)) {
          tasks[i].status = statusValue;
          console.log(tasks);
        }
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

      // write values of taskName and taskType to form to be edited
      document.querySelector("input[name='task-name']").value = taskName;
      document.querySelector("select[name='task-type']").value = taskType;

      // set data attribute to the form with a value of the task's id so it knows which one is being edited
      formEl.setAttribute("data-task-id", taskId);

      // update form's button to reflect editing a task rather than creating a new one
      formEl.querySelector("#save-task").textContent = "Save Task";
    };

    var deleteTask = function(taskId) {
      // find task list element with taskId value and remove it
      var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
      taskSelected.remove();

      // create new array to hold updated list of tasks
      var updatedTaskArr = [];

      // loop through current tasks
      for (var i = 0; i < tasks.length; i++) {
        // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)) {
          updatedTaskArr.push(tasks[i]);
        }
      }

      // reassign tasks array to be the same as updatedTaskArr
      tasks = updatedTaskArr;
    };

    // Event Listeners
    // create a new task
    formEl.addEventListener("submit", taskFormHandler);
    // for edit and delete buttons
    pageContentEl.addEventListener("click", taskButtonHandler);
    // for changing the status 
    pageContentEl.addEventListener("change", taskStatusChangeHandler);

// Ability to read and store users input




// One function to handle the form submission, get the form values, and pass those values to another function as arguments


//Run this fun when the page lode
displayTask();
let taskInput = document.getElementById("userInput");
let addBtn = document.getElementById("Add-Task");
let saveTaskBtn = document.getElementById("save");
let multipuleDelete = document.getElementById("deleteAll");
let searchInput = document.getElementById("searchBar")
// get items from the local storage
function getStorage() {
    let taskObj;
    let webTask = localStorage.getItem('localtask');
    if (webTask == null) {
        taskObj = []
    } else {
        taskObj = JSON.parse(webTask);
    }
    return taskObj;
}
console.log(getStorage());

// set items to the local storage
function setStorage(data) {
    localStorage.setItem('localtask', JSON.stringify(data));
}

// Add event to add task buutton
addBtn.addEventListener("click", addToStorage);

// add task to local storage
function addToStorage() {
    let addtaskInputValue = taskInput.value;
    if (addtaskInputValue.trim() != 0) {
        let taskObj = getStorage()
        taskObj.push(addtaskInputValue);
        setStorage(taskObj)
        taskInput.value = ""
        displayTask()
    } else {
        let snackBar = document.getElementById("snackBar");
        snackBar.className = "show";
        setTimeout(
            function () {
                snackBar.className = snackBar;
                className.replace("show", "");
            }, 3000
        )
    }
}

// display task on html doc
function displayTask() {
    let addedTaskList = document.getElementById("listContainer")
    let taskObj = getStorage()
    let html = "";
    taskObj.forEach((item, index) => {
        html += `<div id="task">
        <span id="taskName">${index + 1}.${item}</span>
        <div id="actions">
          <button id="edit" onClick="editTask(${index})">
            <i class="fa-solid fa-pen-to-square"></i>Edit
          </button>
          <button id="delete" onClick="deleteTask(${index})">
            <i class="fa-solid fa-trash"></i>Delete
          </button>
        </div>
      </div>`
    });
    if (taskObj.length != 0) {
        addedTaskList.innerHTML = html;
    } else {
        addedTaskList.innerHTML = `<span id="noTask">Task list is empty</span>`;

    }
}

// edit task
function editTask(index) {
    let taskObj = getStorage()
    taskInput.value = taskObj[index]
    let saveIndex = document.getElementById("saveIndex")
    saveIndex.value = index;
    addBtn.style.display = "none"
    saveTaskBtn.style.display = "block"
    console.log(index)
}

//  add event to save task btn

saveTaskBtn.addEventListener("click", saveTasks)

// save edited Tasks
function saveTasks() {
    let taskObj = getStorage()
    let saveIndex = document.getElementById("saveIndex").value;
    taskObj[saveIndex] = taskInput.value;
    setStorage(taskObj)
    displayTask()
    taskInput.value = "";
    addBtn.style.display = "block"
    saveTaskBtn.style.display = "none"
}

// delete tsak
function deleteTask(index) {
    let taskObj = getStorage()
    taskObj.splice(index, 1);
    setStorage(taskObj)
    displayTask()
}

// Add click event to delete-all button
multipuleDelete.addEventListener("click", deleteAllTasks)
function deleteAllTasks() {
    let taskObj = getStorage()
    if (taskObj != null) {
        taskObj = []
    }
    setStorage(taskObj)
    displayTask()
    taskInput.value = "";
    addBtn.style.display = "block"
    saveTaskBtn.style.display = "none"
}

// implementing searchBar 

searchInput.addEventListener("input", searchTask)

function searchTask() {
    inputValue = searchInput.value;
    inputValue = inputValue.replace(/^./, str => str.toUpperCase());
    let tasks = document.querySelectorAll("#task")
    Array.from(tasks).forEach(function (element) {
        let taskText = element.getElementsByTagName("span")[0].innerText;
        if (taskText.includes(inputValue)) {
            element.style.display = "block"
            element.style.display = "flex"
        } else {
            element.style.display = "none"
        }
    })
}
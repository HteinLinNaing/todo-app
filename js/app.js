let input = document.querySelector("#input");
let addBtn = document.querySelector("#add-btn");
let todoList = document.querySelector("#todo-list");
let totalTask = document.querySelector("#total-task");

function setTotal(total) {
    totalTask.innerHTML = total;
}

// Clear Completed Tasks
document.querySelector("#clear").onclick = function () {
    let doneTask = document.querySelectorAll("[check='done']");

    // To correct total count
    let current = document.querySelectorAll(".list-group-item").length - doneTask.length;
    setTotal(current);

    doneTask.forEach(task => {
        task.parentElement.remove();
    });
}

// Add Task
addBtn.onclick = function () {
    let inputText = input.value;
    let totalCount = document.querySelectorAll(".list-group-item").length + 1;

    if (!inputText) return false;

    todoList.appendChild(
        createTags(inputText)
    );

    input.value = "";
    input.focus();
    setTotal(totalCount);
}

input.onkeydown = function (e) {
    if (e.which === 13) {
        addBtn.onclick();
    }
}

function createTags(inputTask) {
    let li = document.createElement("li");
    li.textContent = inputTask;
    li.classList.add("list-group-item");

    let delBtn = document.createElement("a");
    delBtn.setAttribute("href", "#");
    delBtn.classList.add("btn", "btn-sm", "fa-solid", "fa-trash-can", "float-end", "text-danger");
    delBtn.onclick = function () {
        let current = document.querySelectorAll(".list-group-item").length - 1;

        delBtn.parentElement.remove();
        setTotal(current);
    }

    let checkBtn = document.createElement("a");
    checkBtn.setAttribute("href", "#");

    checkBtn.classList.add("btn", "btn-sm", "me-2", "fa-regular", "fa-circle", "float-start", "text-danger");
    checkBtn.onclick = function () {

        if (checkBtn.getAttribute("check") === "done") {

            todoList.prepend(checkBtn.parentElement);
            checkBtn.parentElement.style.textDecoration = "none";
            checkBtn.parentElement.style.opacity = "1";
            checkBtn.classList.replace("fa-circle-check", "fa-circle");
            checkBtn.classList.replace("fa-solid", "fa-regular");
            checkBtn.setAttribute("check", "");

        } else {

            todoList.append(checkBtn.parentElement);
            checkBtn.parentElement.style.textDecoration = "line-through";
            checkBtn.parentElement.style.opacity = "0.5";
            checkBtn.classList.replace("fa-circle", "fa-circle-check");
            checkBtn.classList.replace("fa-regular", "fa-solid");
            checkBtn.setAttribute("check", "done");

        }
    }

    li.appendChild(checkBtn);
    li.appendChild(delBtn);

    return li;
}
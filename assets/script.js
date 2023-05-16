console.log("MYDO v1.0 - By Paulo Henrique");

function saveTasksLocal() {
    var elTodoList = document.querySelector("#todoList ul");
    localStorage.setItem("todo-list", elTodoList.innerHTML.trim());
}

function loadTasksLocal() {
    var elTodoList = document.querySelector("#todoList ul");
    var tasksLocal = localStorage.getItem("todo-list").trim();

    if(tasksLocal !== null && tasksLocal.length > 0) elTodoList.innerHTML = tasksLocal;
}

function addTask() {
    const uuid = crypto.randomUUID();

    var elTodoList = document.querySelector("#todoList ul");
    var elDescription = document.querySelector("#taskDescription");

    var textDescription = elDescription.value.trim();

    var taskTemplate = `<li id="item-${uuid}" class="list-group-item d-flex justify-content-between"><div class="w-100 d-flex"><input id="${uuid}" onclick="checkedTask('${uuid}');" class="form-check-input me-2" type="checkbox"><label class="form-check-label stretched-link" for="${uuid}">${textDescription}</label></div><span class="badge bg-danger rounded-pill" onclick="removeTask('${uuid}');">&times;</span></li>`;

    if (elDescription.value.length >= 3) {
        elTodoList.innerHTML = elTodoList.innerHTML + taskTemplate;
        elDescription.value = "";
    } else {
        alert("Descrição da tarefa deve conter 3 caracteres ou mais!");
    }

    saveTasksLocal();
}

function checkedTask(itemId) {
    var elItemTaskContainer = document.querySelector(`#item-${itemId}`);
    var elItemTaskInput = elItemTaskContainer.querySelector("input");

    if(elItemTaskInput.checked) {
        elItemTaskInput.setAttribute('checked', 'checked');;
        elItemTaskContainer.classList.add("task-complete");
    } else {
        elItemTaskInput.removeAttribute('checked');
        elItemTaskContainer.classList.remove("task-complete");
    }

    saveTasksLocal();
}

function removeTask(itemId) {
    document.querySelector(`#item-${itemId}`).remove();
    saveTasksLocal();
}

//adiciona tarefa utilizando a tecla 'enter'
document.querySelector("#taskDescription").addEventListener("keypress", (event) => {
    if (event.charCode == 13 || event.code.toLowerCase() === "enter") addTask();
});

//carrega as tarefas salvas no localStorage
document.addEventListener("load", loadTasksLocal());

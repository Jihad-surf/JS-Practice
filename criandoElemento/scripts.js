/*deixa o formulario de criar uma nova tarefa visivel ou nao, adicionando ou tirando a classe visivel do forms */
const tarefas_form = document.querySelector('.tarefas__form')
const btn_novaTarefa = document.querySelector('.btn_novaTarefa')
btn_novaTarefa.addEventListener('click', () => {
    tarefas_form.classList.toggle('visivel')
})

const btn_cancelar = document.querySelector('.btn_cancelar')
btn_cancelar.addEventListener('click', () => {
    tarefas_form.classList.toggle('visivel')
    document.querySelector('#texto').value = "";
})

/**Cria uma tarefa nova */
function criarTarefa() {
    var text_inserido = document.querySelector('#texto').value
    if (text_inserido.trim() === "") {
        alert("Por favor, insira uma tarefa antes de salvar.");
        return;
    }
    /* crio o elemento de elemento de lista */
    var listItem = document.createElement('li')
    listItem.classList.add('tarefas__item')
    
    /**crio o texto e o checkbox */
    var text = document.createElement('p')
    text.textContent = text_inserido
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = false;

    /**adiono no elemento o texto e o checkbox */
    listItem.appendChild(text)
    listItem.appendChild(checkbox)

    var lista_tarefa = document.querySelector('.tarefas__list')
    lista_tarefa.appendChild(listItem)
    saveTasks(text_inserido, checkbox);
    document.querySelector('#texto').value = "";
}

function saveTasks(text, checkbox) {
    var latestTask = {
        description: text,
        completed: checkbox.checked
    }
    // Obtenha as tarefas existentes do localStorage
    var savedTasks = localStorage.getItem("tasks");
    var tasks = savedTasks ? JSON.parse(savedTasks) : [];

    // Adicione a última tarefa ao array de tarefas
    tasks.push(latestTask);

    // Salve o array atualizado no localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}
function loadTasks() {
    var taskList = document.getElementById("taskList");
    var savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        var tasks = JSON.parse(savedTasks);

        tasks.forEach(function(task) {
            var listItem = document.createElement("li");
            listItem.className = "task";

            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.addEventListener("change", function() {
                saveTasks();
            });

            var taskDescription = document.createElement("span");
            taskDescription.textContent = task.description;

            listItem.appendChild(checkbox);
            listItem.appendChild(taskDescription);

            taskList.appendChild(listItem);
        });
    }
}

const btn_salvar = document.querySelector('.salvar')
btn_salvar.addEventListener('click', () => {
    criarTarefa()
})


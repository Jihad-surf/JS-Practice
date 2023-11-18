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
        alert("Por favor, insira um texto antes de salvar.");
        return;
    }
    /**crio o texto e o checkbox */
    var text = document.createElement('p')
    text.textContent = text_inserido
    var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = false;

    saveTasks(text_inserido, checkbox); //salva
    document.querySelector('#texto').value = "";
    location.reload()
}

function saveTasks(text, checkbox) {
    // Criando um objeto com duas propiedades
    var latestTask = {
        description: text,
        completed: checkbox.checked
    }
    // Obtenha as tarefas existentes do localStorage
    var savedTasks = localStorage.getItem("tasks");
    var tasks;

    if (savedTasks) {
    // Se houver dados armazenados, converte esses dados para um objeto JavaScript
    tasks = JSON.parse(savedTasks);
    } else {
    // Se não houver dados, inicializa tasks como um array vazio
    tasks = [];
    }
    //a condição acima pode ser substituida por var tasks = savedTasks ? JSON.parse(savedTasks) : []; 

    // Adicione a última tarefa ao array de tarefas
    tasks.push(latestTask);
    // Salve o array atualizado no localStorage
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function loadTasks() {
    var taskList = document.querySelector('.tarefas__list')
    var savedTasks = localStorage.getItem("tasks");

    // se tiver dados, transforma em objetos js e faz um for para cada objeto e cria cada um dos objetos
    if (savedTasks) {
        var tasks = JSON.parse(savedTasks);
        tasks.forEach((task, index) =>{
            var listItem = document.createElement("li");
            listItem.className = "task";

            var checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = task.completed;
            checkbox.addEventListener('change', () => {
                // Atualiza o estado da tarefa no localStorage se ele for mudado
                tasks[index].completed = checkbox.checked;
                localStorage.setItem('tasks', JSON.stringify(tasks));
            });

            var taskDescription = document.createElement("p");
            taskDescription.textContent = task.description;

            listItem.appendChild(taskDescription);
            listItem.appendChild(checkbox);
            
            taskList.appendChild(listItem);
        });
    }
}

window.onload = function() {
    loadTasks();
}
const btn_salvar = document.querySelector('.salvar')
btn_salvar.addEventListener('click', () => {
    criarTarefa()
})

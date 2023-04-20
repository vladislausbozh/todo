const form = document.querySelector('#form')
const taskInput = document.querySelector('#taskInput')
const taskList = document.querySelector('#taskList')

let tasks = [];

if(localStorage.getItem('tasks')) {
   tasks = JSON.parse(localStorage.getItem('tasks'))

   tasks.forEach(task => {
      renderTask(task)
   });

}


form.addEventListener('submit',addTask )
taskList.addEventListener('click',deleteTask)
taskList.addEventListener('click',doneTask)

// ФУНКЦИИ
function addTask (event) {
   event.preventDefault();

   taskText = taskInput.value
   
   const newTask = {
      id: Date.now(),
      text: taskText,
      done: true
   }

   tasks.push(newTask)
   
   taskInput.value = ''
   taskInput.focus()

   saveToLocalStorage()

   renderTask(newTask)
}

function deleteTask(event) {
   
   if (event.target.dataset.action === 'delete') {
     const perenNode = event.target.closest('.content-group')

     const id = Number(perenNode.id);

      tasks = tasks.filter(function (task) {
         return task.id !== id
      })
     
     perenNode.remove();
   }
   saveToLocalStorage()
}

function doneTask (event) {
   if (event.target.dataset.action === 'done'){
      const perenNode = event.target.closest('.content-group')

      const id = Number(perenNode.id);

      const task = tasks.find(function(task){
         if(task.id === id)
         return true
      })

      task.done = !task.done
      
      const taskTitle = perenNode.querySelector('span')
      taskTitle.classList.toggle('text-decoration')
   }
   saveToLocalStorage()
}


function saveToLocalStorage() {
   localStorage.setItem('tasks',JSON.stringify(tasks))
}

function renderTask(task) {
   const cssClass = task.done ? 'list__text': 'list__text text-decoration';

      const taskHTML = `
            <li id = '${task.id}' class="content-group">
               <div class="content-buttons">
                  <button class="btn btn-remov" data-action="delete">Delete</button>
                  <button class="btn btn-done" data-action="done">Edit</button>
               </div>
               <span class='${cssClass}'>${task.text}</span>
            </li>`
      taskList.insertAdjacentHTML('afterbegin',taskHTML)
}
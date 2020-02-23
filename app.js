const form = document.querySelector('#task-form');
const input = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');


addEventListeners();

//function addEventListeners
function addEventListeners() {
  
  //eventlistener addtask
  form.addEventListener('submit', addTask);

  //eventlistener removetask
  taskList.addEventListener('click', removeTask);
 
  //eventlistener cleartask
  clearBtn.addEventListener('click', clearList);

   //filtertask on keyup
  filter.addEventListener('keyup', filterTask);
   
  //getTask on ui reload
  document.addEventListener('DOMContentLoaded', getTasks);
}




function addTask(e) {

  //when input is empty
  if (input.value === '') {
    alert( 'please enter a task');
  }


  if (input.value.length > 0) {

  //create Li;
  const li = document.createElement('li');

  //give li class
  li.className= 'collection-item';

  //create textnode and appendchild to li
  li.appendChild(document.createTextNode(input.value));

  //create link 'a'
  const link = document.createElement('a');

  //link className
  link.className = 'delete-item secondary-content';

  //link innerhtml
  link.innerHTML = '<i class="fa fa-remove"></i>';

  //append link to li
  li.appendChild(link);

  //append li to ul
  taskList.appendChild(li);

  //store in localstorag
  storeInLocalStorage(input.value);

  //empty input
  input.value = '';

  }
  
  


 
 
 e.preventDefault();
}

//function storetask in localstorage
function  storeInLocalStorage(task) {
  let tasks;

 // when task is empty
   if (localStorage.getItem('tasks') === null) {
       tasks = [];
   } else {
     // modify task when not empty
        tasks = JSON.parse(localStorage.getItem('tasks'));  
   }

   //push task to tasks
   tasks.push(task);

   localStorage.setItem('tasks',  JSON.stringify(tasks));

   
}


//remove task function from ui;

function removeTask(e) {
  if(e.target.parentElement.classList.contains('delete-item')) {
   
   if (confirm('are you sure you want to remove this task?')) {
    e.target.parentElement.parentElement.remove();
   }
  }

  //remove taskfromlocalstorage on remove from ui
     removeTaskFromLocalStorage(e.target.parentElement.parentElement);
}

// function removetaskfromlocal storage
function removeTaskFromLocalStorage(taskItem) {
  let tasks;
  if (localStorage.getItem('tasks') === null) {
      tasks = [];
  } else {
       tasks = JSON.parse(localStorage.getItem('tasks'));  
  }

   tasks.forEach(function (task, index) {
     if(taskItem.textContent === task) {
       tasks.splice(index, 1);
     }
   })

   localStorage.setItem('tasks',  JSON.stringify(tasks));
}


//clear task from ui
function clearList() {
  
  while  (taskList.firstChild) {
    if (confirm('are you sure?')) {
      taskList.removeChild((taskList.firstChild));
    }   
  }

  filter.value = '';

  clearTaskFromLocalStorage();
}

//cleartaskfromlocal storage
function clearTaskFromLocalStorage() {
   localStorage.clear();
}

//filter task function
function filterTask(e) {
  
  const text = e.target.value.toLowerCase();

  document.querySelectorAll('.collection-item').forEach(function(task){
    const item = task.firstChild.textContent;
    if(item.toLowerCase().indexOf(text) != -1){
      task.style.display = 'block';
    } else {
      task.style.display = 'none';
    }
  });


} 

//DOMcontentreloaded getTask function
function getTasks() {

  let tasks;
  if(localStorage.getItem('tasks') === null){
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem('tasks'));
  }

  tasks.forEach(function(task){
   
    const li = document.createElement('li');
    li.className = 'collection-item';
    li.appendChild(document.createTextNode(task));
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    link.innerHTML = '<i class="fa fa-remove"></i>';
    li.appendChild(link);
     taskList.appendChild(li);
  });

}
//Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

//load all event listeners
loadEventListeners();

//load all event listeners
function loadEventListeners() {
    //DOM load event (for local storage)
    document.addEventListener('DOMContentLoaded', getTasks);

    //Add task event
    form.addEventListener('submit', addTask); //calls a function to add task

    //Remove task event
    taskList.addEventListener('click', RemoveTask);

    //Clear task Event
    clearBtn.addEventListener('click', clearTasks);

    //Filter tasks event 
    filter.addEventListener('keyup', filterTasks);
}

//Get Tasks from Local Storage
function getTasks(){
    //initianize tasks 
    let tasks;
    //check if there are any tasks in there
    if(localStorage.getItem('tasks') === null){
        tasks = []; 
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')); //local storage just takes string so we need to parse it
    }

    tasks.forEach(function(task){
        //create li element
        const li= document.createElement('li');
        //Add class
        li.className = 'collection-item';
        //create input checkbox
        const check = document.createElement('input');
        check.type = 'checkbox';
        // check.innerHTML = '<input type="checkbox" class="check"/>';
        li.appendChild(check);
        //create text node and append to li
        li.appendChild(document.createTextNode(task));
        //create new link element
        const link = document.createElement('a');
        //add class
        link.className= 'delete-item secondary-content';
        //Add icon html
        link.innerHTML = '<li class="fa fa-remove"> X</i>';
        //Append the link to li
        li.appendChild(link);

        

        //append li to ul
        taskList.appendChild(li); //because we gave the ul the name taskList earlier
    });    
}


//add Task Function
function addTask(e) { //takes an event object
    if(taskInput.value ==='') { //if there is no value, nothing written on the input
        alert('Add a task');
    }

    //create li element
    const li= document.createElement('li');
    //Add class
    li.className = 'collection-item';
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement('a');
    //add class
    link.className= 'delete-item secondary-content';
    //Add icon html
    link.innerHTML = '<li class="fa fa-remove"> X</i>';
    //Append the link to li
    li.appendChild(link);

    //append li to ul
    taskList.appendChild(li); //because we gave the ul the name taskList earlier

    //Store in Local Storage
    storeTaskInLocalStorage(taskInput.value);

    //Clear input
    taskInput.value = ''; //to clear the input area each time

    e.preventDefault();

}

//Store Task
function storeTaskInLocalStorage(task) { 
    //initianize tasks 
    let tasks;
    //check if there are any tasks in there
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks')); //local storage just takes string so we need to parse it
    }

    tasks.push(task);

    localStorage.setItem('tasks', JSON.stringify(tasks));
}

//Remove Task function
function RemoveTask(e){ //takes an event parameter
    if(e.target.parentElement.classList.contains('delete-item')){ //we needed the a element which is parent and needs to contain the class 'delete-item' 
       if(confirm('Are You Sure?')) {
        e.target.parentElement.parentElement.remove();
        }
    }
}

//Remove from LS
function removeTaskFromLocalStorage(taskItem){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    tasks.forEach(function(task, index){
        if(taskItem.textContent === task){
            task.splice(index, 1);
        }
    });

    localStorage.setItem('tasks', JSON.stringify(tasks));

}



//Clear All Tasks FUnction
function clearTasks(){
    // taskList.innerHTML = '';

    //Faster:
    while(taskList.firstChild) { //while there is still a first child, which means there are items on the list
        taskList.removeChild(taskList.firstChild);

    }

    //Clear from LS
    clearTasksFromLocalStorage();
}

//Clear Tasks from LS
function clearTasksFromLocalStorage() {
    localStorage.clear();
}


//Filter Tasks function
function filterTasks(e) {
    const text = e.target.value.toLowerCase(); //so no matter how it was written it looks for it in lower case and can find it
    
    document.querySelectorAll('.collection-item').forEach //make sure to get All 
    (function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(text) != -1){ //if there is none, it equals -1 so we want to say if it is not -1 then continue
            task.style.display = 'block'; //so that it shows
        } else {
            task.style.display = 'none'; 
        }
    });
}

//for modules and imports
//maybe I can add the delete function to another file
//have on file for adding tasks
//a main file to call all functions

//Define UI vars
const form = document.querySelector('#task-form');
const taskList = document.querySelector('.displayTasks'); 
// const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');
const activeTasksView = document.querySelector('#activeTasksView')

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

    //Filter tasks event 
    // filter.addEventListener('keyup', filterTasks);

    //Active task event
    activeTasksView.addEventListener('click', activeDisplay);

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
        link.className= 'delete-item';
        //Add X to html
        link.innerHTML = '<li class="x_btn"> X</i>';
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
    //create input checkbox
    const check = document.createElement('input');
    check.type = 'checkbox';
    li.appendChild(check);
    //create text node and append to li
    li.appendChild(document.createTextNode(taskInput.value));
    //create new link element
    const link = document.createElement('a');
    //add class
    link.className= 'delete-item';
    //Add X btn to html
    link.innerHTML = '<li class="x_btn"> X</i>';
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

//----------FILTERS: --------------
//Display certain tasks depending on filter clicked
//All display

// function displayAll()

//Active display

function activeDisplay(activeTask){
    // //initianize tasks 
    // let tasks;
    // activeTasksView.addEventListener('click', activeDisplay);
    check = document.querySelector(".collection-item").checked = true;
    unchecked = document.querySelector(".collection-item").checked = false;
    if (activeTask.target.check) {
        activeTask.target.classList.toggle('checked');
    }; 

    // //check if there are any ACTIVE tasks in there
    // if (localStorage.getItem(activeTask, "checked: false")){
    //     tasks = []
    // } else {
    //         tasks = JSON.parse(localStorage.getItem('tasks')); 
    // }
    // ; 

    // // if(localStorage.getItem('tasks') === null){
    // //     tasks = []; 
    // // } else {
    // //     tasks = JSON.parse(localStorage.getItem('tasks')); //local storage just takes string so we need to parse it
    // // }

    // tasks.forEach(function(task){
    //     //create li element
    //     const li= document.createElement('li');
    //     //Add class
    //     li.className = 'collection-item';
    //     //create input checkbox
    //     const check = document.createElement('input');
    //     check.type = 'checkbox';
    //     // check.innerHTML = '<input type="checkbox" class="check"/>';
    //     li.appendChild(check, "checked: false");
    //     //create text node and append to li
    //     li.appendChild(document.createTextNode(task));
    //     //create new link element
    //     const link = document.createElement('a');
    //     //add class
    //     link.className= 'delete-item';
    //     //Add X to html
    //     link.innerHTML = '<li class="x_btn"> X</i>';
    //     //Append the link to li
    //     li.appendChild(link);

        

    //     //append li to ul
    //     taskList.appendChild(li); //because we gave the ul the name taskList earlier
    // });   


}

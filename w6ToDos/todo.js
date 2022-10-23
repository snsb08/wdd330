



import { writeToLS, readFromLS, bindTouch } from "./utilities.js";

//To store the list of toDos in memory
let liveToDos = null;

//view code here
function renderList(list, element, toDos, hidden) {
    console.log(list);
    element.innerHTML = "";

    list.forEach(toDo => {
        const item = document.createElement('li');
        const formattedDate = new Date(toDo.id).toLocaleDateString("en-US"); //Probably no need
    
    let cb = null;
    let btn = null;

    if(hidden && toDo.completed) {
        item.innerHTML = `<label><input type="checkbox" checked><strike> ${toDo.content}</strike></label><button>X</button>`;
    }
    else {
        item.innerHTML = `<label><input type="checkbox"> ${toDo.content}</label><button>X</button>`
    }

    //Wire listener to the checkbox
    cb = item.childNodes[0].childNodes[0]; //check the checkbox

    if (cb) {
        cb.addEventListener("change", function(){
            toDos.completetoDo(toDo.id);
        })
    } 

    // wire listener to the button 
    btn= item.childNodes[1];
    if(btn){
        btn.addEventListener("click", function() {
            toDos.removeToDo(toDo.id);
        });
    }

    element.appendChild(item);
    })
}

function getToDos(key) {
    if (liveToDos === null) {
        //if we need to go the list from the data store
        liveToDos = readFromLS(key) || [];
    }

    return liveToDos;
    }    

function addToDo (value, key) {
    //use date.now() for UTC millisecond string
    const newToDo = {
        id: new Date(),
        content: value,
        completed: false
    };

    liveToDos.push(newToDo);
    writeToLS(key, liveToDos);
}     

function DeleteToDo (key) {
    let newList = liveToDos.filter(item => item.id != key);
    liveToDos = newList;
    writeToLS (key, liveToDos);
}


//this would be done last if you still have time...
function filterToDos(key, completed = true) {
    let toDos = getToDos(key);

    //return a list OF either completed or not completed toDOs based on the parameter.
    return toDos.filter(item => item.completed === hidden);
}

//public
export default class toDos {

    constructor (listElement, key) {
        //opted to store the listElement inside the class
        console.log(this.listElement);
        this.listElement = listElement;
        console.log(this.listElement);

        //key for localStorage saving and lookup
        this.key = key;
        //why bind here?
        bindTouch("#addToDo", this.newToDo.bind(this));
        this.listToDos();
    }

    newToDo() {
        const task = document.getElementById("todoInput");
        addToDo(task.value.this.key);
        task.value = "";
        this.listToDos();
    }

    findToDo(id) {
        let toDo = liveToDos.find(element => {
            return element.id === id;
        });
        
        return toDo;
    }
    completeToDo (id) {
        console.log(id + "checked");
        let toDo = this.findToDo(id);

        if (toDo) {
            toDo.completed = !toDo.completed;
            writeToLS(this.key, liveToDos);
            renderList(liveToDos, this.listElement, this, true); 
        }
    }

    removeToDo(id) {
        console.log(id + "removed");
        let toDo = this.findToDo(id);

        if(toDo){
            DeleteToDo(id);
            renderList(liveToDos, this.listElement, this, true);
        }
    }


    listToDos(hidden = true) {
        renderList(getToDos(this.key), this.listElement, this, true);
    }
}
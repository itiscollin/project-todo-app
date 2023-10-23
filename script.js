// Array for todo List
const todo = []
let todoDOM = []
let trash = []
let trashDOM = []

// DOM
const addBtn = document.querySelector("#add-todo-btn")
const newTodo = document.querySelector(".new-todo")
const tasklist = document.querySelector(".tasklist")
const rating = document.querySelector(".priority-num")
let task = document.querySelectorAll(".task")
const showCompletedBox = document.querySelector("#showCompleted")
const deletedTodoBtn = document.querySelector("#DeletedTodo")
const activeTodoBtn = document.querySelector("#ActiveTodo")


// Add Button
addBtn.addEventListener("click", (e)=>{
    e.preventDefault()
    addTodo()
    
})

// Add Function
function addTodo(){
    const value = newTodo.value;
    if (value == "") {
        return;
    }

    todo.push({title: value, isCompleted : false, isDeleted: false})
    console.log(todo);
    newTodo.value=""
    syncTodo()
}



// To sync Todo array with DOM 
function syncTodo() {

  // Clear existing tasks
  tasklist.innerHTML = "";
  todoDOM = []
  if(activeTodoBtn.checked === true && deletedTodoBtn.checked === false){
  //ToDo list for DOM
 
  // Check for completed/filter
      for(i = 0; i < todo.length; i++ )
      {
        if(todo[i].isCompleted && !showCompletedBox.checked){
          continue
        } else if(todo[i].isCompleted && showCompletedBox.checked || !todo[i].isCompleted){
          todoDOM.push(todo[i])
        }
      }
  
  // DOM Loop for Current Todo
  
      for(j = 0; j < todoDOM.length; j++ ){
        let newTask = document.createElement('div');
        newTask.classList.add("task");

        newTask.innerHTML =
          `<p class="todo">${todoDOM[j].title}</p>
          <div class = "btnContainer">
          <button class="complete-btn">Complete</button>
          <img class="trash-btn" src="./Asset/icons8-trash.png">
          </div>
          `;

        if (todoDOM[j].isCompleted === true && showCompletedBox.checked){
            newTask.classList.add("completed")
          }  
        tasklist.append(newTask);
      }
      addCompleteBtnsEvent()
      addTrashBtnsEvent()
  }

    if(activeTodoBtn.checked === false && deletedTodoBtn.checked === true){
    
      
    // DOM Loop for Deleted Todo
  
    for(i = 0; i < trash.length; i++ ){
      trashDOM.push(trash[i])
    }
    for(j = 0; j < trashDOM.length; j++){
      let newTask = document.createElement('div');
      newTask.classList.add("task");
      newTask.innerHTML =
        `<p class="todo">${trashDOM[j].title}</p>
        <div class = "btnContainer">
        <button class="undo-btn">Undo</button>
        <img class="del-btn" src="./Asset/icons8-trash.png">
        </div>
        `;
      
      tasklist.append(newTask);
     }
     addUndoBtnsEvent()
     addDelBtnsEvent()
    }
};

// Add event listener for all complete buttons
function addCompleteBtnsEvent(){
let completeBtns = document.querySelectorAll(".complete-btn");
  completeBtns.forEach((completeBtn, i) => {
    completeBtn.addEventListener("click", () => {
      toggleComplete(i);
      console.log("Complete btn pressed");
});})
}
  
// Add event listener for all complete buttons
function addTrashBtnsEvent() {
  const trashBtn = document.querySelectorAll(".trash-btn")
  trashBtn.forEach((trashBtn, index) => {
    trashBtn.addEventListener("click", () => {
      {
        for (let j = 0; j < todo.length; j++) {
          if (todoDOM[index].title === todo[j].title) {
            trash.push(todo[j])
            todo.splice(j, 1);
            todoDOM.splice(index, 1);
          }
        }
      }
      syncTodo();
      console.log("DelButton pressed");
    });
  });
}

function addDelBtnsEvent() {
  const delBtn = document.querySelectorAll(".del-btn")
  delBtn.forEach((delBtn, index) => {
    delBtn.addEventListener("click", () => {
      {
        for (let j = 0; j < trash.length; j++) {
          if (trashDOM[index].title === trash[j].title) {
            trash.splice(j, 1);
          }
        }
        trashDOM = []
      }
      console.log("DelButton pressed");
      syncTodo()
    });
  });
}


function addUndoBtnsEvent(){
const undoBtn = document.querySelectorAll(".undo-btn")
undoBtn.forEach((undoBtn,index)=> {
  undoBtn.addEventListener("click", ()=>{
    console.log("undoBtn pressed");
    for(let i = 0; i < trash.length; i++){
      if(trashDOM[index].title === trash[i].title){
        todo.push(trash[i])
        trash.splice(i,1)
      }
      trashDOM = []
      syncTodo()
    }})
  })
}
  




function toggleComplete(i){
  console.log(todoDOM[i]);
    let task = document.querySelectorAll('.task')
    if(todoDOM[i].isCompleted === false){
        todoDOM[i].isCompleted = true
        task[i].classList.add("completed")
        syncTodo()
    } else
if(todoDOM[i].isCompleted === true)
    {todoDOM[i].isCompleted = false
    task[i].classList.remove("completed")}
    syncTodo()
}


// Hide Completed <-> Show completed
// If completed === true && checkBox === true => class + hide

showCompletedBox.addEventListener("click", ()=>{
  trashDOM = []
   syncTodo()
})

// Rating change


window.addEventListener("load", ()=>{
    syncTodo()
})

activeTodoBtn.addEventListener("click", ()=>{
  syncTodo()
})
deletedTodoBtn.addEventListener("click", ()=>{
  trashDOM = []
  syncTodo()
})
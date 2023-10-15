// Array for todo List
const todo = []
let todoDOM = []

// DOM
const addBtn = document.querySelector("#add-todo-btn")

const newTodo = document.querySelector(".new-todo")
const tasklist = document.querySelector(".tasklist")
const rating = document.querySelector(".priority-num")
let task = document.querySelectorAll(".task")
const showCompletedBox = document.querySelector("#showCompleted")


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

    todo.push({title: value, isCompleted : false})
    console.log(todo);
    newTodo.value=""
    syncTodo()
}



// To sync Todo array with DOM 
function syncTodo() {

  // Clear existing tasks
  tasklist.innerHTML = "";
  
  //ToDo list for DOM
  todoDOM = []
  // Check for completed/filter
      for(i = 0; i < todo.length; i++ )
      {
        if(todo[i].isCompleted && !showCompletedBox.checked){
          continue
        } else if(todo[i].isCompleted && showCompletedBox.checked || !todo[i].isCompleted){
          todoDOM.push(todo[i])
        }
      }
  
  // DOM Loop
      for(j = 0; j < todoDOM.length; j++ ){


        let newTask = document.createElement('div');
        newTask.classList.add("task");

        newTask.innerHTML =
          `<p class="todo">${todoDOM[j].title}</p>
          <span class="importance"> Importance: </span>
          <select for="importance"> 
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button class="complete-btn">Complete</button>
          <img class="del-btn" src="./Asset/icons8-trash.png">`;

        if (todoDOM[j].isCompleted === true && showCompletedBox.checked){
            newTask.classList.add("completed")
          }  
        tasklist.append(newTask);
      }
      addCompleteBtnsEvent()
      addDelBtnsEvent()
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
function addDelBtnsEvent() {
  const delBtn = document.querySelectorAll(".del-btn")
  delBtn.forEach((delBtn, index) => {
    delBtn.addEventListener("click", () => {
      {
        for (let j = 0; j < todo.length; j++) {
          if (todoDOM[index].title === todo[j].title) {
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

  // function delTodo(index){
  //   console.log("delBtn pressed");
  //   for(i = 0; i < todoDOM.length; i++){
  //     for(j = 0; j < todo.length; j++){
  //     if(todoDOM[index].title === todo(j).title){
  //       todo.splice(i,1)
  //       todoDOM.splice(i,1)
  //     }}
  //   syncTodo()
  //   }
  // }

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
   syncTodo()
})


// Rating change
// Trash

// write to do -> update array object
// for every todo -> sync -> append html
// 

window.addEventListener("load", ()=>{
    syncTodo()
})
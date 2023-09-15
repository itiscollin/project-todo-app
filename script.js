const addBtn = document.querySelector("#add-todo-btn")
const delBtn = document.querySelectorAll(".del-btn")
const newTodo = document.querySelector(".new-todo")
const tasklist = document.querySelector(".tasklist")
const rating = document.querySelector(".priority-num")
let task = document.querySelectorAll(".task")
const showCompletedBox = document.querySelector("#showCompleted")
let completeBtn = document.querySelectorAll(".complete-btn")

addBtn.addEventListener("click", (e)=>{
    e.preventDefault()
    addTodo()
})


for (let i = 0; i < delBtn.length; i++) {
    delBtn[i].addEventListener("click", () => {
        task[i].remove();
    });
}



function addTodo(){
    const value = newTodo.value;
    if (value == "") {
        return;
    }
    let newTask = document.createElement('div')
    newTask.classList.add("task")
    newTask.innerHTML =
        `<p class="todo">${value}</p>
    <span class="importance"> Importance: </span>
    <select name="priority" class="priority-num">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
    </select>
    <button class="complete-btn">Complete</button>
    <img class="del-btn" src="./Asset/icons8-trash.png">`;
    tasklist.append(newTask);
    newTodo.value = "";

    // Attach event listener to the new complete button
    const completeBtn = newTask.querySelector(".complete-btn");
    completeBtn.addEventListener("click", () => {
       newTask.classList.toggle("completed")

    //    Check for Show completed mark
       showComplete(showCompletedBox)
});
}






// Hide Completed <-> Show completed
// If completed === true && checkBox === true => class + hide

showCompletedBox.addEventListener("click", ()=>{
 const value = showCompletedBox
    showComplete(value)
})

function showComplete(value){
    if(value.checked){
        let task = document.getElementsByClassName("task ")
    for(i = 0; i < task.length;i++){
        if(task[i].classList.contains("completed")){
            task[i].classList.remove("hidden")
        }
        }
    };
    

    if(!value.checked){
        let task = document.getElementsByClassName("task ")
    for(i = 0; i < task.length;i++){
        if(task[i].classList.contains("completed")){
            task[i].classList.add("hidden")
        }
        }
    };
}

   

   
    
    // if(!value.checked){
    //     for(let i = 0; i < tasklist.childElementCount; i++){
    //         if (tasklist.children.contains("completed")){
    //             tasklist.children.classList.toggle("hidden")
    //         }
    //     }
    // }
// }


// Ranking
// Trash
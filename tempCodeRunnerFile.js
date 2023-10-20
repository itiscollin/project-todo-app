 let completeBtn = document.querySelectorAll(".complete-btn")
    completeBtn.forEach((completeBtn, index) =>{
        completeBtn.addEventListener("click", () => {
            const task = document.querySelectorAll(".task")[index]
           toggleComplete(index)
            task.classList.toggle("completed")
            syncTodo()
        })
    })
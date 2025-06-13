const addBtn = document.getElementById("addBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");
const taskList = document.getElementById("taskList");
const doneTaskList = document.getElementById("doneTaskList");
const countEle = document.getElementById("count");
// rendering based on localStorage
const data = JSON.parse(localStorage.getItem("data")) || [];
const tasks = data.map(data => {
    return {ele: createTask(data.text,data.done), done: data.done};
})

// console.log(tasks);
tasks.forEach(task => {
    if(task.done){
        doneTaskList.appendChild(task.ele);
    } else {
        taskList.appendChild(task.ele);
    }
    // console.log(task)
});


//Add task Event Listener
addBtn.addEventListener("click", addTask);
document.addEventListener("keydown", (e)=>{
    if(e.key === "Enter"){
        addTask();
    }
})

//DleteAll btn event listener
deleteAllBtn.addEventListener("click",deleteAllTasks);


updateTaskContainerVisibility();
updateCount();

//Functions
function addTask(){
    let task = document.getElementById("taskInput").value.trim();
    if(task){
        const taskEle = createTask(task);
        taskList.appendChild(taskEle);

        //Storing in Local Storage
        const data = JSON.parse(localStorage.getItem("data")) || []; 
        data.push({text: task, done: false});
        localStorage.setItem("data", JSON.stringify(data));    
    }
    document.getElementById("taskInput").value = "";
    updateTaskContainerVisibility();
    updateCount();
}

function createIconBtnGroup(iconsWithHandlers=[]){
    const div = document.createElement("div");
    div.classList.add("icon-group");

    iconsWithHandlers.forEach(({icon, onClick}) =>
         {
        const btn = document.createElement("button");
        btn.classList.add("icon-btn", `${icon}-btn`);
        btn.setAttribute("aria-label", icon);

        const iconEl = document.createElement("i");
        iconEl.classList.add("fas", `fa-${icon}`);
        btn.appendChild(iconEl);
        
        if(typeof onClick === "function"){
            btn.onclick = onClick;
        }
        
        div.appendChild(btn);
    })

    return div;
}

function createTask(content, done=false){
    const li = document.createElement("li");
    const span = document.createElement("span");
    span.textContent = content;
    li.appendChild(span);

    const btnData = [
        done ? {icon: "retweet", onClick: () => {restoreTask(content, li)}} : {icon: "check", onClick: ()=>{markTask(content, li)}},
        {icon: "trash", onClick: () => {deleteTask(content, li)}}
    ]

    const btnGroup = createIconBtnGroup(btnData);
    li.appendChild(btnGroup);

    return li;
}

function markTask(content, li){
    updateLocalStorage(content);
    moveToDoneList(content,li);
    updateTaskContainerVisibility();
    updateCount();
}

function restoreTask(content, li){
    updateLocalStorage(content);
    moveToTodoList(content,li);
    updateTaskContainerVisibility();
    updateCount();
}

function deleteTask(content, li){
    const data = JSON.parse(localStorage.getItem("data")) || [];
    const newData = data.filter(task => task.text !== content);
    localStorage.setItem("data", JSON.stringify(newData));
    li.remove();
    updateTaskContainerVisibility();
    updateCount();
}

function deleteAllTasks(){
    localStorage.removeItem("data");
    taskList.innerHTML = "";
    doneTaskList.innerHTML = "";
    updateTaskContainerVisibility();
    updateCount();
}

function moveToDoneList(content, li){
    li.remove();
    const newList = createTask(content, true);
    doneTaskList.appendChild(newList);
}

function moveToTodoList(content, li){
    li.remove();
    const newList = createTask(content, false);
    taskList.appendChild(newList);
}

function updateLocalStorage(content){
    const data = JSON.parse(localStorage.getItem("data")) || [];
    const newData = data.map((task) => {
        if(task.text === content){
            return {...task, done: !task.done};
        }
        return task;
    })
    localStorage.setItem("data", JSON.stringify(newData));
}

function updateTaskContainerVisibility(){
    const taskLists = document.querySelectorAll(".task-list");
    taskLists.forEach(taskList => {
        if(taskList.children.length > 0){
            taskList.parentElement.style.display = "block";
        }else{
            taskList.parentElement.style.display = "none";
        }
    })

}

function updateCount(){
    const data = JSON.parse(localStorage.getItem("data")) || [];
    const count = (data.filter(data => !data.done)).length;
    countEle.textContent = count;
}
const form = document.querySelector('#task-form');
const taskInput = document.querySelector('#task');
const taskList = document.querySelector('.collection');
const inputFilter = document.querySelector('#filter');
const clearAllTask = document.querySelector('.clear-tasks');
let tasks = [];

window.onload = () => {
    const loadedTasks = JSON.parse(localStorage.getItem('tasks'));
    tasks = loadedTasks;
    
    if (tasks !== null) {
        createTaskList();
    } else {
        tasks = []
    }
}; 






const submitTask = (e) => {
    e.preventDefault()
    if(!e.target.elements.task.value) {   // e.target.elements.task.value == taskInput.value 
        alert('no input');
        return;
    }
    taskList.innerHTML = '';
    tasks.push(taskInput.value);
    saveToStorage(tasks);

    createTaskList();

    // tasks.forEach((task) => {
    //     const li = document.createElement('li');
    //     li.className = 'collection-item';
    //     //li.appendChild(document.createTextNode(taskInput.value));
    //     li.textContent = task;
    //     const link = document.createElement('a');
    //     link.className = 'delete-item secondary-content';
    //     link.innerHTML= '<i class="fa fa-remove"></i>';
    //     li.appendChild(link);
    //     link.addEventListener('click', () => {
    //         if(confirm('Are you sure?')) {
    //             const indexNum = tasks.indexOf(li.textContent);
    //             tasks.splice(indexNum, 1);
    //             saveToStorage(tasks);
    //             li.remove();
    //         }
        
    //     })
    //     taskList.appendChild(li);
    // })
    
    taskInput.value = '';

}

const createTaskList = () => {
    tasks.forEach((task) => {
        const li = document.createElement('li');
        li.className = 'collection-item';
        //li.appendChild(document.createTextNode(taskInput.value));
        li.textContent = task;
        const link = document.createElement('a');
        link.className = 'delete-item secondary-content';
        link.innerHTML= '<i class="fa fa-remove"></i>';
        li.appendChild(link);
        link.addEventListener('click', () => {
            if(confirm('Are you sure?')) {
                const indexNum = tasks.indexOf(li.textContent);
                tasks.splice(indexNum, 1);
                saveToStorage(tasks);
                li.remove();
            }
        
        })
        taskList.appendChild(li);
    })
    
} 

const saveToStorage = (tasks) => {
    const taskString = JSON.stringify(tasks);
    localStorage.setItem('tasks', taskString);
}

form.addEventListener('submit', submitTask);

const filterTasks = (e) => {
    const text = e.target.value.toLowerCase();
    const tasks = document.querySelectorAll('li');
    tasks.forEach((task) => {
        const item = task.textContent.toLowerCase();
        if(item.indexOf(text) != -1){
            task.style.display = 'block';
        } else {
            task.style.display = 'none';
        }
    })
}

inputFilter.addEventListener('keyup', filterTasks);

clearAllTask.addEventListener('click', () => {
    taskList.innerHTML = '';
    localStorage.clear();
})
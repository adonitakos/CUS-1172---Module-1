/*
* task_title
* task_priority
* task_status
*/


let priority_level = document.getElementById("priority_level");

let inProgress = [];
let completed = [];


document.addEventListener('DOMContentLoaded', function() {

    document.querySelector('#add').onclick = function() {
        const li = document.createElement('li');
        const p_level = document.querySelector('#priority_level').value;
        // if (p_level === 'high') {
        //     p_level.style.color = red;
        // }
        // if (p_level === 'medium') {
        //     p_level.style.color = blue;
        // }
        // if (p_level === 'low') {
        //     p_level.style.color = green;
        // }

        let task_title = document.querySelector('#task').value;
        let task_html = `
                            <span> ${task_title} </span>
                            <button class="complete">Completed</button>
                            <button class="remove">Remove</button>
                            <span class = "priority"> Priority: ${p_level} </span>
                            
                        `; // <--- task_html variable declaration ends here
        li.innerHTML = task_html;

// Appending the task from the input bar to the unordered list in the HTML
        document.querySelector("#toDo-List").append(li);
        console.log(`\"${task_title}\" was appended to toDo-List`);


// Clearing the task input bar upon submission
        document.querySelector("#task").value = '';
        console.log("task input was cleared");
// Appending the task elements to an array
        inProgress.push(task);
        console.log(inProgress);
        return false;
 
    } // <--- document.querySelector('#add).onclick ends here

    document.querySelector('#priority_level').onchange = function() {
    
    }
 
// Functionality of Remove button
    document.addEventListener('click', function(event) {
        element = event.target;
        if(element.className === 'remove') {
            element.parentElement.remove();
            console.log(`\"${element.value}\" was removed from the toDo-List`);
        } // <--- if(element.className) statement ends here
        else if(element.className === 'complete') {
            element.parentElement.style.opacity = '0.5';
        }

    }) // <--- document.addEventListener('click') ends here


}); // <--- document.addEventListener() ends here


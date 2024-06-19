const input_field= document.getElementById('input-box');
const all_task_container = document.getElementById('all-tasks-container');
const add_btn =  document.getElementById('add-btn');
const notification =  document.getElementById('notification');
const noti_txt =  document.getElementById('noti-msg');




const show_noti= (content, color_="rgb(136, 134, 226)", bodr_col='#0800ff')=>{
    const noti_del =  document.getElementById('noti-del');
    const notification =  document.getElementById('notification');

    notification.style.backgroundColor=color_;
    notification.style.borderColor=bodr_col;
    
    notification.style.visibility='visible';
    notification.style.right='0%';
    noti_txt.textContent= content;
    setTimeout(()=>{
        notification.style.right='-50%';
        notification.style.visibility='hidden';
    },2000);

    noti_del.onclick= ()=>{
        notification.style.visibility='hidden';
        notification.style.right='-50%';

    }

}


const spandel_func = (eachDiv) =>{
    eachDiv.remove();
    load_data_func(all_task_container.innerHTML); 
    show_noti('Removed Task', 'red','#fff');
}


const spandone_func=(eachDiv,spandone,Done_work)=>{
    load_data_func(all_task_container.innerHTML); 
    var Done_work = spandone.classList.toggle("assign-btn-selected");

    if (!Done_work){
        show_noti('Task complete UNcheck','rgb(109, 12, 35');
        eachDiv.style.backgroundColor= 'rgb(49, 47, 45)';
        load_data_func(all_task_container.innerHTML); 
    }
    else{
        show_noti('Task complete check', 'rgb(151, 232, 160)','green');
        eachDiv.style.backgroundColor= '#7B66FF';
        load_data_func(all_task_container.innerHTML); 
    }

}


const add_task_func=(contents)=>{

        if (! contents == ''){
            var sound = document.getElementById("clickSound");
            sound.play();
            input_field.value= '';
            show_noti('Added new Task')
            let eachDiv = document.createElement("div");
            eachDiv.id= "each-task";  
            eachDiv.innerHTML= `<p></p>
            <span class="material-symbols-outlined unselectable btns assign-btn ">assignment_turned_in</span>
            <span class="material-symbols-outlined unselectable btns" id="del-btn">delete</span>`;
            text= document.createTextNode(contents);

            eachDiv.querySelector('p').appendChild(text);
            let spandone= eachDiv.querySelector('.assign-btn');
            let spandel= eachDiv.querySelector('#del-btn');
            spandone.addEventListener('click', () => spandone_func(eachDiv, spandone));
            spandel.addEventListener('click', () => spandel_func(eachDiv));
            eachDiv.style.animation= 'animate_addedTask .2s';
            
            all_task_container.appendChild(eachDiv);
            load_data_func(all_task_container.innerHTML);   

        }
    }

input_field.addEventListener('keydown', (event) =>{
    contents= input_field.value;
    if (event.key === "Enter"){
        // Make new task
        add_task_func(contents);
    }
        
})

add_btn.onclick = () => {
    contents = input_field.value;
    add_task_func(contents);
};

// store at first
storebackFrom_local_storage();
function storebackFrom_local_storage() {
    
    all_data =localStorage.getItem('task_list');
    if (all_data){
    all_task_container.innerHTML= all_data
    const allTasks = document.querySelectorAll('#each-task');


    allTasks.forEach(eachDiv =>{
        const spandone = eachDiv.querySelector('.assign-btn');
        const spandel = eachDiv.querySelector('#del-btn');
        let Done_work = false;
        spandone.addEventListener('click', () => Done_work= spandone_func(eachDiv, spandone, Done_work));
        spandel.addEventListener('click', () => spandel_func(eachDiv));

    })
    }
}
const load_data_func = (data) =>{
    localStorage.setItem('task_list', data);
}

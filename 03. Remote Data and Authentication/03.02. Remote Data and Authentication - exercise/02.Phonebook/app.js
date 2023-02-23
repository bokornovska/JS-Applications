function attachEvents() {
    
    const url = 'http://localhost:3030/jsonstore/phonebook'
    
    const ul = document.getElementById('phonebook');
    const loadBtn = document.getElementById('btnLoad');
    const createBtn = document.getElementById('btnCreate');

    const person = document.getElementById('person');
    let phone = document.getElementById('phone');

    loadBtn.addEventListener('click', onLoad);
    createBtn.addEventListener('click', onCreate);

    async function onLoad() {

        ul.innerHTML = '';
        const response = await fetch(url);
        const data = await response.json();

        Object.values(data).forEach(x => {
            const {person, phone, _id} = x;

            let liElement = document.createElement("li");
            liElement.textContent = `${person}: ${phone}`;
   
            let deleteBtn = document.createElement("button");
            deleteBtn.textContent = "Delete";
            deleteBtn.setAttribute("id", _id);
            liElement.appendChild(deleteBtn);
            ul.appendChild(liElement);

            deleteBtn.addEventListener('click', onDelete);
        })

    }

    async function onDelete (ev){
        const id = ev.target.id;
        if (ev.target.textContent === "Delete") {
            fetch(`${url}/${id}`, {
                method: "delete",
            })
                .then((response) => {
                    onLoad();
                    return response.json();
                })
                .catch((error) => alert(error.message));
        };
    }

    function createElement(type, text, appender){

        const resultElement = document.createElement(type);
        resultElement.textContent = text;

        appender.appendChild(resultElement);

        return resultElement;
    }

    async function onCreate(){

        if(person.value !=='' && phone.value !==''){
            const response = await fetch(url, {
                method:"post",
                headers:{'Content-Type': 'application/json'},
                body:JSON.stringify({person:person.value, phone:phone.value})
            });

            ul.innerHTML = ''
            // loadBtn.click();
            onLoad();

            person.value = '';
            phone.value = '';
        }

    }

}

attachEvents();
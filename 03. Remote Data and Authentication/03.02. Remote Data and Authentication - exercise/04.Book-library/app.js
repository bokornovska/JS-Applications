let url = 'http://localhost:3030/jsonstore/collections/books';
let loadBtn = document.getElementById('loadBooks');

let tBodyElement = document.getElementsByTagName("tbody")[0];
let formElement = document.getElementsByTagName('form')[0];

formElement.addEventListener('submit', onAdd);

loadBtn.addEventListener('click', onLoad);

async function onAdd(e) {
    e.preventDefault();

    let nameInputElement = document.getElementsByName('title');
    let authorInputElement = document.getElementsByName('author');

    if (nameInputElement.value !== '' || authorInputElement.value !== '') {

        const response = await fetch(url, {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: {
                "author": `${authorInputElement.value}`,
                "title": `${nameInputElement.value}`
              }
            })
              
    }


}


async function onLoad(e) {

    let response = await fetch(url);

    if (response.status !== 200) {
        throw new Error('Problem loading data')
    };

    let data = await response.json();
    tBodyElement.innerHTML = ''

    let entries = Object.entries(data);

    for (let [key, { author, title }] of entries) {
        // console.log(book.author)

        let tr = document.createElement('tr');

        let td1 = document.createElement('td');
        td1.textContent = title;
        tr.appendChild(td1);

        let td2 = document.createElement('td');
        td2.textContent = author;
        tr.appendChild(td2);

        let td3 = document.createElement('td');
        let editBtn = document.createElement('button');
        editBtn.textContent = 'Edit';

        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';

        td3.appendChild(editBtn);
        td3.appendChild(deleteBtn);
        tr.appendChild(td3);

        tBodyElement.appendChild(tr);

        deleteBtn.addEventListener('click', onDelete);

        async function onDelete(e) {
            e.preventDefault();

            fetch(`${url}/${key}`, {
                method: 'DELETE',
            });

            tr.remove();

        }
    };

}



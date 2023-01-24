async function solution() {

    const main = document.getElementById('main');
    const url = 'http://localhost:3030/jsonstore/advanced/articles/list';

    const response = await fetch(url);
    const data = await response.json();

    data.forEach(a => {

        let divAcordeon = createElement('div', '', ['class', 'accordion']);
        let divHead = createElement('div', '', ['class', 'head']);
        let span = createElement('span', a.title,);
        let button = createElement('button', 'More', ['class', 'button', 'id', a._id]);
        let divExtra = createElement('div', '', ['class', 'extra']);
        let p = createElement('p');

        button.addEventListener('click', toggle)

        divHead.appendChild(span);
        divHead.appendChild(button);
        divExtra.appendChild(p);

        divAcordeon.appendChild(divExtra);
        divAcordeon.appendChild(divHead);
        main.appendChild(divAcordeon);
    });

    async function toggle(ev){
        // console.log(ev.target.id)

        const acordeon = ev.target.parentNode.parentNode;
        const p = ev.target.parentNode.parentNode.children[0].children[0];

        const extra = ev.target.parentNode.parentNode.children[0];


        let id = ev.target.id;
        let url = `http://localhost:3030/jsonstore/advanced/articles/details/${id}`;

        const res = await fetch(url);
        const data = await res.json();

        // console.log(data);

        p.textContent = data.content;

        let hidden = ev.target.textContent === 'More';

        extra.style.display = hidden ? 'block' : 'none';
        ev.target.textContent = hidden ? 'Less' : 'More'
    }

    function createElement(type, content, attributes = []) {

        const element = document.createElement(type);

        if (content) {
            element.textContent = content;
        }

        if(attributes.length>0){
            for(let i = 0; i<attributes.length;i+=2){
                element.setAttribute(attributes[i], attributes[i+1]);
            }
        };

        return element;
    }
}

solution();
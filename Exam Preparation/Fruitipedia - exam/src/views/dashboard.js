import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../api/data.js';

const dashboardTemp = (fruits) => {
    return html`

<h2>Fruits</h2>
<section id="dashboard">
${fruits.length == 0
        ? html`
        <h2>No fruit info yet.</h2>
        `
        : html`

        ${fruits.map(fruitCard)}

        `}

</section>
    `
};

const fruitCard = (fruit) => {
    return html`
    <div class="fruit">
        <img src=${fruit.imageUrl} alt="example1" />
        <h3 class="title">${fruit.name}</h3>
        <p class="description">${fruit.description}</p>
        <a class="details-btn" href="/details/${fruit._id}">More Info</a>
    </div>
    `
}


export async function dashboardView(ctx) {
    const fruits = await getAll();
    ctx.render(dashboardTemp(fruits));
}


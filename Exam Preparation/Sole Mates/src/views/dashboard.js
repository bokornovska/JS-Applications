import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../api/data.js';

const dashboardTemp = (shoes) => {
    return html`
<section id="dashboard">
    <h2>Collectibles</h2>

    ${shoes.length == 0
    ? html`
    <h2>There are no items added yet.</h2>
    `
    : html`
    <ul class="card-wrapper">
        ${shoes.map(shoeCard)}
    </ul>
    `}

</section>
    `
};

const shoeCard = (shoe) => {
    return html`
    <li class="card">
        <img src="${shoe.imageUrl}" alt="eminem" />
        <p>
            <strong>Brand: </strong><span class="brand">${shoe.brand}</span>
        </p>
        <p>
            <strong>Model: </strong><span class="model">${shoe.model}</span>
        </p>
        <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
        <a class="details-btn" href="/details/${shoe._id}">Details</a>
    </li>
    `
}

export async function dashboardView(ctx) {
    const shoes = await getAll();
    // console.log(posts);
    ctx.render(dashboardTemp(shoes));
}

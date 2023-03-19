import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../api/data.js';

const dashboardTemp = (products) => {
    return html`
<h2>Products</h2>
<section id="dashboard">
    ${products.length == 0
    ? html`
    <h2>No products yet.</h2>
    `
    : html`
        ${products.map(productCardTemp)}
    `}
</section>
    `
};

const productCardTemp = (product) => {
    return html`
<div class="product">
    <img src=${product.imageUrl} alt="example1" />
    <p class="title">${product.name}</p>
    <p><strong>Price:</strong><span class="price">${product.price} </span>$</p>
    <a class="details-btn" href="/details/${product._id}">Details</a>
</div>
    `
}

export async function dashboardView(ctx) {
    const products = await getAll();

    ctx.render(dashboardTemp(products));
}
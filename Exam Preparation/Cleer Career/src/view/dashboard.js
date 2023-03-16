import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../api/data.js';

const dashboardTemp = (offers) => {
    return html`
<section id="dashboard">
    <h2>Job Offers</h2>

    <!-- Display a div with information about every post (if any)-->
    ${offers.length == 0
            ? html`
    <h2>No offers yet.</h2>
    `
            : offers.map(offerCardTemp)}


</section>
    `
};

const offerCardTemp = (offer) => {
    return html`
    <div class="offer">
        <img src=${offer.imageUrl} alt="example1" />
        <p>
            <strong>Title: </strong><span class="title">${offer.title}</span>
        </p>
        <p><strong>Salary:</strong><span class="salary">${offer.salary}</span></p>
        <a class="details-btn" href="/details/${offer._id}">Details</a>
    </div>
    `
}

export async function dashboardView(ctx) {
    const offers = await getAll();
    // console.log(posts);
    ctx.render(dashboardTemp(offers));
}

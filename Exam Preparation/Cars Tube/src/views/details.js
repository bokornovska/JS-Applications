import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteById, getById } from '../api/data.js';
import { getUserData } from '../api/utils.js';

const detailsTemp = (car, isCreator, onDelete) => html`


<section id="listing-details">
    <h1>Details</h1>
    <div class="details-info">
        <img src=${car.imageUrl}>
        <hr>
        <ul class="listing-props">
            <li><span>Brand:</span>${car.brand}</li>
            <li><span>Model:</span>${car.model}</li>
            <li><span>Year:</span>${car.year}</li>
            <li><span>Price:</span>${car.price}$</li>
        </ul>

        <p class="description-para">${car.description}</p>

        ${isCreator ? html`
        <div class="listings-buttons">
            <a href="/edit/${car._id}" class="button-list">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" class="button-list">Delete</a>
        </div>
        `: ''}
    </div>
</section>    
`
export async function detailsView(ctx) {

    const id = ctx.params.id;
    const car = await getById(id);
    // console.log(id);

    const userData = getUserData();
    const isCreator = userData?.id == car._ownerId;


    ctx.render(detailsTemp(car, isCreator, onDelete));

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete this post?');
        // console.log(choise)

        if (choise == true) {
            await deleteById(id);
            // console.log(ctx.page)
            ctx.page.redirect('/all-listings');
        }
    }


}
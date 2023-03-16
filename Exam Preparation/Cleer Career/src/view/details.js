import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteById, getById } from '../api/data.js';
import { getUserData } from '../api/utils.js';

const detailsTemp = (offer, isCreator, onDelete) => html`

<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${offer.imageUrl} alt="example1" />
        <p id="details-title">${offer.detailsTemp}</p>
        <p id="details-category">
            Category: <span id="categories">${offer.category}</span>
        </p>
        <p id="details-salary">
            Salary: <span id="salary-number">${offer.salary}</span>
        </p>
        <div id="info-wrapper">
            <div id="details-description">
                <h4>Description</h4>
                <span>${offer.description}</span>
            </div>
            <div id="details-requirements">
                <h4>Requirements</h4>
                <span>${offer.requirements}</span>
            </div>
        </div>
        <p>Applications: <strong id="applications">1</strong></p>
        ${isCreator ? html`
        <div id="action-buttons">
            <a href="/edit/${offer._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="" id="delete-btn">Delete</a>
            `
                : html`
            <!--Bonus - Only for logged-in users ( not authors )-->
            <a href="" id="apply-btn">Apply</a>
            `}

        </div>
    </div>
</section>
`


export async function detailsView(ctx) {

    const id = ctx.params.id
    const offer = await getById(id);
    // console.log(offer);

    const userData = getUserData();
    const isCreator = userData?.id == offer._ownerId;


    ctx.render(detailsTemp(offer, isCreator, onDelete));

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete this post?');
        // console.log(choise)

        if (choise == true) {
            await deleteById(id);
            // console.log(ctx.page)
            ctx.page.redirect('/dashboard');
        }
    }


}
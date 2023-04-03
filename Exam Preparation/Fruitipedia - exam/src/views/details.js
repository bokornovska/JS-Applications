import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteById, getById } from '../api/data.js';
import { getUserData } from '../api/utils.js';

const detailsTemp = (fruit, isCreator, onDelete) => html`


<section id="details">
    <div id="details-wrapper">
        <img id="details-img" src=${fruit.imageUrl} alt="example1" />
        <p id="details-title">${fruit.name}</p>
        <div id="info-wrapper">
            <div id="details-description">
                <p>${fruit.description}</p>
                <p id="nutrition">Nutrition</p>
                <p id="details-nutrition">
                    ${fruit.nutrition}
                </p>
            </div>

            <!--Edit and Delete are only for creator-->
            ${isCreator ? html`
            <div id="action-buttons">
                <a href="/edit/${fruit._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
            </div>
            `: ''}
        </div>
    </div>
</section>
`
export async function detailsView(ctx) {

    const id = ctx.params.id;
    const fruit = await getById(id);

    const userData = getUserData();
    const isCreator = userData?.id == fruit._ownerId;


    ctx.render(detailsTemp(fruit, isCreator, onDelete));

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
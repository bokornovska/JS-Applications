import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteById, getById } from '../api/data.js';
import { getUserData } from '../api/utils.js';

const detailsTemp = (shoe, isCreator, onDelete) => html`

<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Shoe Details</p>
        <div id="img-wrapper">
            <img src=${shoe.imageUrl} alt="example1" />
        </div>
        <div id="info-wrapper">
            <p>Brand: <span id="details-brand">${shoe.brand}</span></p>
            <p>
                Model: <span id="details-model">${shoe.model}</span>
            </p>
            <p>Release date: <span id="details-release">${shoe.release}</span></p>
            <p>Designer: <span id="details-designer">${shoe.designer}</span></p>
            <p>Value: <span id="details-value">${shoe.value}</span></p>
        </div>
        ${isCreator ? html`
        <div id="action-buttons">
            <a href="/correct/${shoe._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
        </div>
        `: ''}


    </div>
</section>

        
`
export async function detailsView(ctx) {

    const id = ctx.params.id;
    const shoe = await getById(id);
    // console.log(id);

    const userData = getUserData();
    const isCreator = userData?.id == shoe._ownerId;


    ctx.render(detailsTemp(shoe, isCreator, onDelete));

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete this post?');
        // console.log(choise)

        if (choise == true) {
            await deleteById(id);
            console.log(ctx.page)
            ctx.page.redirect('/dashboard');
        }
    }


}
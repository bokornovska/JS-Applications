import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteById, getById } from '../api/data.js';
import { getUserData } from '../api/utils.js';

const detailsTemp = (post, isCreator, onDelete) => html`

<section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
        <div id="details">
            <div class="image-wrapper">
                <img src="${post.imageUrl}" alt="Material Image" class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${post.title}</h2>
                <p class="post-description">Description: ${post.description}</p>
                <p class="post-address">Address: ${post.address}</p>
                <p class="post-number">Phone number: ${post.phone}</p>
                <p class="donate-Item">Donate Materials: 0</p>

                ${isCreator ? html`
                <div class="btns">
                    <a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>

                </div>
                `
                : html`
                <!--Bonus - Only for logged-in users ( not authors )-->
                <a href="/donate" class="donate-btn btn">Donate</a>
                `}
            </div>
        </div>
    </div>
</section>
`


export async function detailsView(ctx) {

    const id = ctx.params.id
    const post = await getById(id);
    console.log(post);

    const userData = getUserData();
    const isCreator = userData?.id == post._ownerId;


    ctx.render(detailsTemp(post, isCreator, onDelete));

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete this post?');
        // console.log(choise)

        if (choise == true) {
            await deleteById(id);
            console.log(ctx.page)
            ctx.page.redirect('/');
        }
    }


}
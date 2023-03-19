import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteById, getById } from '../api/data.js';
import { getUserData } from '../api/utils.js';

const detailsTemp = (album, isCreator, onDelete) => html`

<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
            <img src=${album.imageUrl} alt="example1" />
        </div>
          <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
            <p>
              <strong>Album name:</strong><span id="details-album">${album.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
          </div>
          <div id="likes">Likes: <span id="likes-count">0</span></div>

          <!--Edit and Delete are only for creator-->
          ${isCreator ? html`
                <div id="action-buttons">
                    
                    <a href="/edit/${album._id}" id="edit-btn">Edit</a>
                    <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                </div>`
                : html`
                <div id="action-buttons">
                    <a href="" id="like-btn">Like</a>
                </div>
                `}
</section>
`


export async function detailsView(ctx) {

    const id = ctx.params.id
    const album = await getById(id);

    const userData = getUserData();
    const isCreator = userData?.id == album._ownerId;


    ctx.render(detailsTemp(album, isCreator, onDelete));

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete this post?');
        // console.log(choise)

        if (choise == true) {
            await deleteById(id);
            ctx.page.redirect('/dashboard');
        }
    }


}
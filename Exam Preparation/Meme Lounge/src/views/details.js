import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteById, getById } from '../api/data.js';
import { getUserData } from '../api/utils.js';

const detailsTemp = (meme, isCreator, onDelete) => html`
 <section id="meme-details">
            <h1>Meme Title: ${meme.title}</h1>
            <div class="meme-details">
                <div class="meme-img">
                    <img alt="meme-alt" src=${meme.imageUrl}>
                </div>
                <div class="meme-description">
                    <h2>Meme Description</h2>
                    <p>
                        ${meme.description}
                    </p>
                    ${isCreator
                    ? html`
                    <a class="button warning" href="/edit/${meme._id}">Edit</a>
                    <button @click=${onDelete} class="button danger">Delete</button>
                    `
                    : ''}
                   
                    
                </div>
            </div>
        </section>
`;

export async function detailsView(ctx) {

    const id = ctx.params.id;
    const meme = await getById(id);
    
    const hasUser = Boolean(sessionStorage.getItem('userData'));
    const isCreator = hasUser && getUserData(id)._id == meme._ownerId;
    // console.log(getUserData(id)._id)
    

    ctx.render(detailsTemp(meme,isCreator,onDelete));

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete this pet?');
        // console.log(choise)

        if (choise == true) {
            await deleteById(id);
            ctx.page.redirect('/catalog');
        }
    }

   
}
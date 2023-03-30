import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteById, getById } from '../api/data.js';
import { getUserData } from '../api/utils.js';

const detailsTemp = (theater, isCreator, onDelete) => html`

<section id="detailsPage">
            <div id="detailsBox">
                <div class="detailsInfo">
                    <h1>Title: ${theater.title}</h1>
                    <div>
                        <img src=${theater.imageUrl} />
                    </div>
                </div>

                <div class="details">
                    <h3>Theater Description</h3>
                    <p>${theater.description}</p>
                    <h4>Date: ${theater.date}</h4>
                    <h4>Author: ${theater.author}</h4>
                    <div class="buttons">
                        ${isCreator 
                        ? html `
                        <a class="btn-delete" @click=${onDelete} href="javascript:void(0)">Delete</a>
                        <a class="btn-edit" href="/edit/${theater._id}">Edit</a>
                        `
                        :html `<a class="btn-like" href="#">Like</a>`}
                        
                        
                    </div>
                    <p class="likes">Likes: 0</p>
                </div>
            </div>
        </section>
         
`


export async function detailsView(ctx) {

    const id = ctx.params.id
    const theater = await getById(id);
    // console.log(post);

    const userData = getUserData();
    const isCreator = userData?.id == theater._ownerId;


    ctx.render(detailsTemp(theater, isCreator, onDelete));

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete this post?');
        // console.log(choise)

        if (choise == true) {
            await deleteById(id);
            // console.log(ctx.page)
            ctx.page.redirect('/');
        }
    }


}
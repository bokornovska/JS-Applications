import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteById, getById } from '../api/data.js';
import { getUserData } from '../api/utils.js';


const detailsTemp = (book, isCreator, userData, onDelete) => html`
    <section id="details-page" class="details">
        <div class="book-information">
            <h3>${book.title}</h3>
            <p class="type">${book.type}</p>
            <p class="img"><img src=${book.imageUrl}></p>
            <div class="actions">
                    <!-- Edit/Delete buttons ( Only for creator of this book )  -->
                    ${isCreator ? html`
                    <a class="button" href="/edit/${book._id}">Edit</a>
                <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>
                `
                : html`         
                ${userData ? html` <a class="button" href="#">Like</a>` : ''}  
            `}
              <!-- ( for Guests and Users )  -->
                <div class="likes">
                    <img class="hearts" src="/images/heart.png">
                    <span id="total-likes">Likes: 0</span>
                </div>
                
            </div>
        </div>
        <div class="book-description">
            <h3>Description:</h3>
            <p>${book.description}</p>
        </div>
    </section>
`


export async function detailsView(ctx) {

    const id = ctx.params.id
    const book = await getById(id);

    const userData = getUserData();
    const isCreator = userData?.id == book._ownerId;


    ctx.render(detailsTemp(book, isCreator, userData, onDelete));

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete this post?');
        // console.log(choise)

        if (choise == true) {
            await deleteById(id);
            ctx.page.redirect('/dashboard');
        }
    }


}
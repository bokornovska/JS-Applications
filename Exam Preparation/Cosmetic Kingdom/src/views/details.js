import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteById, getById } from '../api/data.js';
import { getUserData } from '../api/utils.js';


const detailsTemp = (product, isCreator, userData, onDelete) => html`
<section id="details">
        <div id="details-wrapper">
          <img id="details-img" src=${product.imageUrl} alt="example1" />
          <p id="details-title">${product.name}</p>
          <p id="details-category">
            Category: <span id="categories">${product.category}</span>
          </p>
          <p id="details-price">
            Price: <span id="price-number">${product.price}</span>$</p>
          <div id="info-wrapper">
            <div id="details-description">
              <h4>Bought: <span id="buys">0</span> times.</h4>
              <span>${product.description}</span>
            </div>
          </div>

          <!--Edit and Delete are only for creator-->
          <div id="action-buttons">
          ${isCreator ? html`
                <a href="/edit/${product._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>
                `
                : html`         
                ${userData? html` <a href="" id="buy-btn">Buy</a>` : ''}       
                
            `}
          </div>
        </div>
      </section>
`


export async function detailsView(ctx) {

    const id = ctx.params.id
    const product = await getById(id);

    const userData = getUserData();
    const isCreator = userData?.id == product._ownerId;


    ctx.render(detailsTemp(product, isCreator, userData, onDelete));

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete this post?');
        // console.log(choise)

        if (choise == true) {
            await deleteById(id);
            ctx.page.redirect('/catalog');
        }
    }


}
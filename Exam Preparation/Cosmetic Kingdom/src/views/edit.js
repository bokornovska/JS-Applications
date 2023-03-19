import { html } from '../../node_modules/lit-html/lit-html.js';
import { getById } from '../api/data.js';
import { createSubbmitHandler } from '../api/utils.js';
import { editProduct } from '../api/data.js';



const editTemp = (product, onSubmit) => html`
<section id="edit">
        <div class="form">
          <h2>Edit Product</h2>
          <form @submit=${onSubmit} class="edit-form">
            <input type="text" name="name" id="name" placeholder="Product Name" .value=${product.name} />
            <input type="text" name="imageUrl" id="product-image" placeholder="Product Image" .value=${product.imageUrl} />
            <input type="text" name="category" id="product-category" placeholder="Category" .value=${product.category} />
            <textarea id="product-description" name="description" placeholder="Description" rows="5"
              cols="50" .value=${product.description} ></textarea>

            <input type="text" name="price" id="product-price" placeholder="Price" .value=${product.price} />
            <button type="submit">post</button>
          </form>
        </div>
      </section>
`;

export async function editView(ctx) {

    const id = ctx.params.id;
    const album = await getById(id);
    console.log(album)

    ctx.render(editTemp(album, createSubbmitHandler(onSubmit)));

    async function onSubmit({
        name,
        imageUrl, 
        category, 
        description, 
        price
    })
    {

    if (name == '' || category == '' || imageUrl == '' || description == '' || price == '') {
        return alert('All fields required!')
    }

    await editProduct(id, {
        name,
        imageUrl, 
        category, 
        description, 
        price
    });

    ctx.page.redirect(`/details/${id}`);
}
}
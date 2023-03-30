import { html } from '../../node_modules/lit-html/lit-html.js';
import { createListing } from '../api/data.js';
import { createSubbmitHandler } from '../api/utils.js';

const createTemp = (onSubmit) => {
    return html`
<section id="create-listing">
    <div class="container">
        <form @submit=${onSubmit} id="create-form">
            <h1>Create Car Listing</h1>
            <p>Please fill in this form to create an listing.</p>
            <hr>

            <p>Car Brand</p>
            <input type="text" placeholder="Enter Car Brand" name="brand">

            <p>Car Model</p>
            <input type="text" placeholder="Enter Car Model" name="model">

            <p>Description</p>
            <input type="text" placeholder="Enter Description" name="description">

            <p>Car Year</p>
            <input type="number" placeholder="Enter Car Year" name="year">

            <p>Car Image</p>
            <input type="text" placeholder="Enter Car Image" name="imageUrl">

            <p>Car Price</p>
            <input type="number" placeholder="Enter Car Price" name="price">

            <hr>
            <input type="submit" class="registerbtn" value="Create Listing">
        </form>
    </div>
</section>
    `
};

export function createView(ctx) {
    ctx.render(createTemp(createSubbmitHandler(onSubmit)));

    year = Number(year);
    price = Number(price);

    async function onSubmit({
        brand,
        model,
        description,
        year,
        imageUrl,
        price


    }) {

        if (brand == '' || model == '' || description == '' || year == '' || imageUrl == '' || price == '') {
            return alert('All fields required!')
        }
        if(Number(year) <= 0 || Number(price) <= 0){
            return alert ('Year and price must be positive numbers!')
        }


        await createListing({
            brand,
            model,
            description,
            year: Number(year),
            imageUrl,
            price: Number(price)

        });


        ctx.page.redirect('/all-listings');
    }
}

import { html } from '../../node_modules/lit-html/lit-html.js';
import { create } from '../api/data.js';
import { createSubbmitHandler } from '../api/utils.js';

const createTemp = (onSubmit) => {
    return html`


<section id="create">
    <div class="form">
        <h2>Add Fruit</h2>
        <form @submit=${onSubmit} class="create-form">
            <input type="text" name="name" id="name" placeholder="Fruit Name" />
            <input type="text" name="imageUrl" id="Fruit-image" placeholder="Fruit Image" />
            <textarea id="fruit-description" name="description" placeholder="Description" rows="10"
                cols="50"></textarea>
            <textarea id="fruit-nutrition" name="nutrition" placeholder="Nutrition" rows="10" cols="50"></textarea>
            <button type="submit">Add Fruit</button>
        </form>
    </div>
</section>
    `
};

export function createView(ctx) {
    ctx.render(createTemp(createSubbmitHandler(onSubmit)));

    async function onSubmit({

        name,
        imageUrl,
        description,
        nutrition

    }) {

        if (name == '' || imageUrl == '' || description == '' || nutrition == '') {
            return alert('All fields required!')
        }

        await create({
            name,
            imageUrl,
            description,
            nutrition

        });


        ctx.page.redirect('/dashboard');
    }
}

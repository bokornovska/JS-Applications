import { html } from '../../node_modules/lit-html/lit-html.js';
import { getById, editFruit } from '../api/data.js';
import { createSubbmitHandler } from '../api/utils.js';



const editTemplate = (fruit, onSubmit) => html`
     
    <section id="edit">
        <div class="form">
            <h2>Edit Fruit</h2>
            <form @submit=${onSubmit} class="edit-form">
                <input type="text" name="name" id="name" placeholder="Fruit Name" .value=${fruit.name} />
                <input type="text" name="imageUrl" id="Fruit-image" placeholder="Fruit Image URL"
                    .value=${fruit.imageUrl} />
                <textarea id="fruit-description" name="description" placeholder="Description" rows="10" cols="50"
                    .value=${fruit.description}></textarea>
                <textarea id="fruit-nutrition" name="nutrition" placeholder="Nutrition" rows="10" cols="50"
                    .value=${fruit.nutrition}></textarea>
                <button type="submit">post</button>
            </form>
        </div>
    </section>

`;

export async function editView(ctx) {

    const id = ctx.params.id;
    // console.log(id)
    const fruit = await getById(id);

    ctx.render(editTemplate(fruit, createSubbmitHandler(onSubmit)));

    async function onSubmit({
        name,
        imageUrl,
        description,
        nutrition

    }) {

        if (name == '' || imageUrl == '' || description == '' || nutrition == '') {
            return alert('All fields required!')
        }

        await editFruit(id, {
            name,
            imageUrl,
            description,
            nutrition
        });

        ctx.page.redirect('/details/' + id);
    }
}
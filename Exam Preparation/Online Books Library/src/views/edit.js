import { html } from '../../node_modules/lit-html/lit-html.js';
import { getById } from '../api/data.js';
import { createSubbmitHandler } from '../api/utils.js';
import { editBook } from '../api/data.js';



const editTemp = (book, onSubmit) => html`
<section id="edit-page" class="edit">
            <form @submit=${onSubmit} id="edit-form" action="#" method="">
                <fieldset>
                    <legend>Edit my Book</legend>
                    <p class="field">
                        <label for="title">Title</label>
                        <span class="input">
                            <input type="text" name="title" id="title" .value=${book.title}>
                        </span>
                    </p>
                    <p class="field">
                        <label for="description">Description</label>
                        <span class="input">
                            <textarea name="description"
                                id="description" .value=${book.description}></textarea>
                        </span>
                    </p>
                    <p class="field">
                        <label for="image">Image</label>
                        <span class="input">
                            <input type="text" name="imageUrl" id="image" .value=${book.imageUrl}>
                        </span>
                    </p>
                    <p class="field">
                        <label for="type">Type</label>
                        <span class="input">
                            <select id="type" name="type" value="Fiction">
                                <option .value=${book.type}>${book.type}</option>
                                <option value="Fiction">Fiction</option>
                                <option value="Romance">Romance</option>
                                <option value="Mistery">Mistery</option>
                                <option value="Classic">Clasic</option>
                                <option value="Other">Other</option>
                            </select>
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Save">
                </fieldset>
            </form>
        </section>
`;

export async function editView(ctx) {

    const id = ctx.params.id;
    const book = await getById(id);
   
    ctx.render(editTemp(book, createSubbmitHandler(onSubmit)));

    async function onSubmit({
        title,
        description,
        imageUrl,
        type
    })
    {

        if (title == '' || imageUrl == '' || description == '' || type == '') {
            return alert('All fields required!')
        }

    await editBook(id, {
        title,
        description,
        imageUrl,
        type
    });

    ctx.page.redirect(`/details/${id}`);
}
}
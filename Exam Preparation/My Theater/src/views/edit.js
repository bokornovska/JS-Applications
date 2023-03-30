import { html } from '../../node_modules/lit-html/lit-html.js';
import { getById } from '../api/data.js';
import { createSubbmitHandler } from '../api/utils.js';
import { editTheater } from '../api/data.js';



const editTemp = (theater, onSubmit) => html`
<section id="editPage">
    <form @submit=${onSubmit} class="theater-form">
        <h1>Edit Theater</h1>
        <div>
            <label for="title">Title:</label>
            <input id="title" name="title" type="text" placeholder="Theater name" .value=${theater.title}>
        </div>
        <div>
            <label for="date">Date:</label>
            <input id="date" name="date" type="text" placeholder="Month Day, Year" .value=${theater.date}>
        </div>
        <div>
            <label for="author">Author:</label>
            <input id="author" name="author" type="text" placeholder="Author" value=${theater.author}>
        </div>
        <div>
            <label for="description">Theater Description:</label>
            <textarea id="description" name="description" placeholder="Description"
                .value=${theater.description}></textarea>
        </div>
        <div>
            <label for="imageUrl">Image url:</label>
            <input id="imageUrl" name="imageUrl" type="text" placeholder="Image Url" .value=${theater.imageUrl}>
        </div>
        <button class="btn" type="submit">Submit</button>
    </form>
</section>
`;

export async function editView(ctx) {

    const id = ctx.params.id;
    const theater = await getById(id);

    ctx.render(editTemp(theater, createSubbmitHandler(onSubmit)));

    async function onSubmit({
        title,
        date,
        author,
        imageUrl,
        description

    }) {

        if (title == '' || date == '' || imageUrl == '' || author == '' || description == '') {
            return alert('All fields required!')
        }

        await editTheater(id, {
            title,
            date,
            author,
            imageUrl,
            description
        });

        ctx.page.redirect('/details/' + id);
    }
}
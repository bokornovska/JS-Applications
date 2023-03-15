import { html } from '../../node_modules/lit-html/lit-html.js';
import { getById } from '../api/data.js';
import { createSubbmitHandler } from '../api/utils.js';
import { editPost } from '../api/data.js';



const editTemp = (post, onSubmit) => html`
 <section id="edit-page" class="auth">
            <form @submit=${onSubmit} id="edit">
                <h1 class="title">Edit Post</h1>

                <article class="input-group">
                    <label for="title">Post Title</label>
                    <input type="title" name="title" id="title" .value=${post.title}>
                </article>

                <article class="input-group">
                    <label for="description">Description of the needs </label>
                    <input type="text" name="description" id="description" .value=${post.description}>
                </article>

                <article class="input-group">
                    <label for="imageUrl"> Needed materials image </label>
                    <input type="text" name="imageUrl" id="imageUrl" .value=${post.imageUrl}>
                </article>

                <article class="input-group">
                    <label for="address">Address of the orphanage</label>
                    <input type="text" name="address" id="address" .value=${post.address}>
                </article>

                <article class="input-group">
                    <label for="phone">Phone number of orphanage employee</label>
                    <input type="text" name="phone" id="phone" .value=${post.phone}>
                </article>

                <input type="submit" class="btn submit" value="Edit Post">
            </form>
        </section>
`;

export async function editView(ctx) {

    const id = ctx.params.id;
    const post = await getById(id);

    ctx.render(editTemp(post, createSubbmitHandler(onSubmit)));

    async function onSubmit({
        title,
        description,
        imageUrl,
        address,
        phone
      
    }) {

        if (title == '' || description == '' || imageUrl == '' || address == '' || phone == '') {
            return alert('All fields required!')
        }

        await editPost(id, {
            title,
            description,
            imageUrl,
            address,
            phone
        });

        ctx.page.redirect('/details/' + id);
    }
}
import { html } from '../../node_modules/lit-html/lit-html.js';
import { createAlbum } from '../api/data.js';
import { createSubbmitHandler } from '../api/utils.js';

const createTemp = (onSubmit) => {
    return html`
<section id="create">
    <div class="form">
        <h2>Add Album</h2>
        <form @submit=${onSubmit} class="create-form">
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
            <input type="text" name="album" id="album-album" placeholder="Album" />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
            <input type="text" name="release" id="album-release" placeholder="Release date" />
            <input type="text" name="label" id="album-label" placeholder="Label" />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" />

            <button type="submit">post</button>
        </form>
    </div>
</section>
    `
};

export function createView(ctx) {
    ctx.render(createTemp(createSubbmitHandler(onSubmit)));

    async function onSubmit({
        singer,
        album,
        imageUrl,
        release,
        label,
        sales

    }) {

        if (singer == '' || album == '' || imageUrl == '' || release == '' || label == '' || sales == '') {
            return alert('All fields required!')
        }

        await createAlbum({
            singer,
            album,
            imageUrl,
            release,
            label,
            sales
        });


        ctx.page.redirect('/dashboard');
    }
}


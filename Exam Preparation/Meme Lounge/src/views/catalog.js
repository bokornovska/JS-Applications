import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../api/data.js';

const catalogTemp = (memes) => {
    return html`
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        <!-- Display : All memes in database ( If any ) -->
        ${memes.length == 0 
        ? html`
        <p class="no-memes">No memes in database.</p>
        `
        : memes.map(memeCardTemp)}
        
        
    </div>
</section>
    `
};

const memeCardTemp = (meme) => {
    return html`
    <div class="meme">
        <div class="card">
            <div class="info">
                <p class="meme-title">${meme.title}</p>
                <img class="meme-image" alt="meme-img" src=${meme.imageUrl}>
            </div>
            <div id="data-buttons">
                <a class="button" href="/details/${meme._id}">Details</a>
            </div>
        </div>
    </div>
    `
}

export async function catalogView(ctx) {
    const memes = await getAll();
    console.log(memes);
    ctx.render(catalogTemp(memes));
}

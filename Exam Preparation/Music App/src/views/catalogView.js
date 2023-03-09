import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as albumService from '../services/albumService.js'


const albumTemp = (album, withDetails = true) => {
    return html`
    <div class="card-box">
        <img src=${album.imgUrl}>
        <div>
            <div class="text-center">
                <p class="name">Name: ${album.name}</p>
                <p class="artist">Artist: ${album.artist}</p>
                <p class="genre">Genre: ${album.genre}</p>
                <p class="price">Price: ${album.price}</p>
                <p class="date">Release Date: ${album.releaseDate}</p>
            </div>
            ${withDetails 
                ? html`
                <div class="btn-group">
                    <a href="/albums/${album._id}" id="details">Details</a>
                </div>
                ` 
                : nothing}
    
        </div>
    </div>
    `
}

const catalogTemp = (albums, user) => {
    return html`
    <section id="catalogPage">
        <h1>All Albums</h1>
    
        ${albums.map(x => albumTemp(x, Boolean(user)))}
    
        ${albums.length == 0 ? html` <p>No Albums in Catalog!</p>` : ''}
    
    
    </section>
    `
}

export const catalogView = (ctx) => {
    albumService.getAll()
        .then(albums => {
            ctx.render(catalogTemp(albums, ctx.user))
        })
}
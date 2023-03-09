import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as albumService from '../services/albumService.js';



const detailsTemp = (album, user) => {
    return html`
     <section id="detailsPage">
            <div class="wrapper">
                <div class="albumCover">
                    <img src=${album.imgUrl}>
                </div>
                <div class="albumInfo">
                    <div class="albumText">

                        <h1>Name: ${album.name}</h1>
                        <h3>Artist: ${album.artist}</h3>
                        <h4>Genre: ${album.genre}</h4>
                        <h4>Price: ${album.price}</h4>
                        <h4>Date: ${album.releaseDate}</h4>
                        <p>Description: ${album.description}</p>
                    </div>

                    <!-- Only for registered user and creator of the album-->
                   ${user._id === album._ownerId
                    ? html`
                     <div class="actionBtn">
                        <a href="/albums/${album._id}/edit" class="edit">Edit</a>
                        <a href="/albums/${album._id}/delete" class="remove">Delete</a>
                    </div>
                    `
                    : nothing
                   }
                </div>
            </div>
        </section>
    `
}

export const detailsView = (ctx) => {
    albumService.getOne(ctx.params.albumId)
    .then(album => {
        ctx.render(detailsTemp(album, ctx.user))
    })
}
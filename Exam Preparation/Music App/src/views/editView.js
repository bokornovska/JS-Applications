import { html } from '../../node_modules/lit-html/lit-html.js';
import * as albumService from '../services/albumService.js';
import {albumIsInvalid} from '../utils/validators.js';


const editTemp = (album, submitHandler) => {
    return html`
    <section class="editPage">
            <form @submit=${submitHandler}>
                <fieldset>
                    <legend>Edit Album</legend>

                    <div class="container">
                        <label for="name" class="vhide">Album name</label>
                        <input id="name" value=${album.name} name="name" class="name" type="text" >

                        <label for="imgUrl" class="vhide">Image Url</label>
                        <input id="imgUrl" value=${album.imgUrl} name="imgUrl" class="imgUrl" type="text" >

                        <label for="price" class="vhide">Price</label>
                        <input id="price" value=${album.price} name="price" class="price" type="text" >

                        <label for="releaseDate" class="vhide">Release date</label>
                        <input id="releaseDate" value=${album.releaseDate} name="releaseDate" class="releaseDate" type="text" >

                        <label for="artist" class="vhide">Artist</label>
                        <input id="artist" value=${album.artist} name="artist" class="artist" type="text" >

                        <label for="genre" class="vhide">Genre</label>
                        <input id="genre" value=${album.genre} name="genre" class="genre" type="text" >

                        <label for="description" class="vhide">Description</label>
                        <textarea .value=${album.description} name="description" class="description" rows="10"
                            cols="10"></textarea>

                        <button class="edit-album" type="submit">Edit Album</button>
                    </div>
                </fieldset>
            </form>
        </section>
    `
}

export const editView = (ctx) => {
    const submitHandler = (e) => {
        e.preventDefault();
        const albumData = Object.fromEntries(new FormData(e.currentTarget));

        if(albumIsInvalid(albumData)){
            alert(`All fields should be filled`);
            return;
        }
        albumService.edit(ctx.params.albumId, albumData)
        .then(() => {
            ctx.page.redirect(`/albums/${ctx.params.albumId}`)
        })
    }
    albumService.getOne(ctx.params.albumId)
    .then(album => {
        ctx.render(editTemp(album, submitHandler))
    })
}
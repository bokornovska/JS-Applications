import { html } from '../../node_modules/lit-html/lit-html.js';
import * as albumService from '../services/albumService.js'
import { albumTemp } from './templates/albumTemplate.js';


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
import { html } from '../../node_modules/lit-html/lit-html.js';
import * as albumService from '../services/albumService.js';
import { albumTemp } from './templates/albumTemplate.js';

const searchTemp = (searchHandler, albums, isLogged) => {
    return html`
    <section id="searchPage">
        <h1>Search by Name</h1>
    
        <div class="search">
            <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
            <button class="button-list" @click=${searchHandler}>Search</button>
        </div>
    
        <h2>Results:</h2>
    
       
        <div class="search-result">
            <!--If have matches-->
          
            <!--If there are no matches-->
            ${albums.length == 0
            ? html `<p class="no-result">No result.</p>`
            : html ` ${albums.map(x => albumTemp(x, isLogged))} `
            }
            
        </div>
    </section>
    `
};

export const searchView = (ctx) => {
    const searchHandler = (e) => {
        // e.preventDefault();
        let searchElement = document.getElementById('search-input');
        albumService.search(searchElement.value)
            .then(albums => {
                let isLogged = Boolean(ctx.user);
                ctx.render(searchTemp(searchHandler, albums, isLogged))

            })

    }
    ctx.render(searchTemp(searchHandler, []))
}
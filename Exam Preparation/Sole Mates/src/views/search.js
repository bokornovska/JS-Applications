import { html } from '../../node_modules/lit-html/lit-html.js';
import { search } from '../api/data.js';

const searchTemp = (searchHandler, shoes, isLogged) => {
    return html`
     <section id="search">
          <h2>Search by Brand</h2>

          <form @submit=${searchHandler} class="search-wrapper cf">
            <input
              id="#search-input"
              type="text"
              name="search"
              placeholder="Search here..."
              required
            />
            <button type="submit">Search</button>
          </form>

          <h3>Results:</h3>

          <div id="search-container">

            ${shoes.length == 0
            ? html `<h2>There are no results found.</h2>`
            : html ` <ul class="card-wrapper">${shoes.map(x => shoeCard(x, isLogged))}</ul> `
            }
           
          </div>
        </section>
    `
};

export const searchView = (ctx) => {
    const searchHandler = (e) => {
        e.preventDefault();
        let searchElement = document.getElementById('#search-input');
        search(searchElement.value)
            .then(shoes => {
                let isLogged = Boolean(ctx.user);
                ctx.render(searchTemp(searchHandler, shoes, isLogged))

            })

    }
    ctx.render(searchTemp(searchHandler, []))
}

const shoeCard = (shoe, isLogged) => {
    return html`
    <li class="card">
        <img src="${shoe.imageUrl}" alt="eminem" />
        <p>
            <strong>Brand: </strong><span class="brand">${shoe.brand}</span>
        </p>
        <p>
            <strong>Model: </strong><span class="model">${shoe.model}</span>
        </p>
        <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
        ${isLogged ? html`<a class="details-btn" href="/details/${shoe._id}">Details</a>`: ''}
        
    </li>
    `
}
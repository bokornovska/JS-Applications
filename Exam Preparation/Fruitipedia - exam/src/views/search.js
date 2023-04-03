import { html } from '../../node_modules/lit-html/lit-html.js';
import { search } from '../api/data.js';

const searchTemp = (searchHandler, fruits) => {
    return html`

<section id="search">

<div class="form">
  <h2>Search</h2>
  <form @submit=${searchHandler} class="search-form">
    <input
      type="text"
      name="search"
      id="search-input"
    />
    <button class="button-list">Search</button>
  </form>
</div>

<h4>Results:</h4>

  <div class="search-result">
    ${fruits.length == 0
            ? html `<p class="no-result">No result.</p>`
            : html ` ${fruits.map(x => fruitCard(x))} `
            }
  </div>
  
</section>
    `
};

export const searchView = (ctx) => {
    const searchHandler = (e) => {
        e.preventDefault();
        let searchElement = document.getElementById('search-input');
        search(searchElement.value)
            .then(fruits => {
                ctx.render(searchTemp(searchHandler, fruits))
            })

    }
    ctx.render(searchTemp(searchHandler, []))
}

const fruitCard = (fruit) => {
    return html`
     <div class="fruit">
  <img src=${fruit.imageUrl} alt="example1" />
  <h3 class="title">${fruit.name}</h3>
  <p class="description">${fruit.description}</p>
  <a class="details-btn" href="/details/${fruit._id}">More Info</a>
</div>
    `
}

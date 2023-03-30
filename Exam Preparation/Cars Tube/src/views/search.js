import { html } from '../../node_modules/lit-html/lit-html.js';
import { search } from '../api/data.js';

const searchTemp = (searchHandler, cars) => {
    return html`

<section id="search-cars">
            <h1>Filter by year</h1>

            <div class="container">
                <input id="search-input" type="text" name="search" placeholder="Enter desired production year">
                <button @click=${searchHandler} class="button-list">Search</button>
            </div>

            <h2>Results:</h2>
            <div class="listings">

            ${cars.length == 0
            ? html `<p class="no-cars"> No results.</p>`
            : html ` ${cars.map(x => carCard(x))} `
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
            .then(cars => {
                ctx.render(searchTemp(searchHandler, cars))

            })

    }
    ctx.render(searchTemp(searchHandler, []))
}

const carCard = (car) => {
    return html`
     <div class="listing">
                    <div class="preview">
                        <img src=${car.imageUrl}>
                    </div>
                    <h2>${car.brand} ${car.model}</h2>
                    <div class="info">
                        <div class="data-info">
                            <h3>Year: ${car.year}</h3>
                            <h3>Price: ${car.price} $</h3>
                        </div>
                        <div class="data-buttons">
                            <a href="/details/${car._id}" class="button-carDetails">Details</a>
                        </div>
                    </div>
                </div>
    `
}
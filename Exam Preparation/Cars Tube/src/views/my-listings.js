import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyListings } from "../api/data.js";
import { getUserData } from "../api/utils.js";



const myListingsTemp = (cars) => {
    return html`
   <section id="my-listings">
            <h1>My car listings</h1>
            <div class="listings">


        <div class="board">
            ${cars.length === 0
                ? html`
            <div class="no-events">
            <p class="no-cars"> You haven't listed any cars yet.</p>
            </div>
            `
            : cars.map(carCardTemp)}
        </div>
    </section>
    `;
}

const carCardTemp = (car) => html`
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

export async function myListingsView(ctx) {
    const userData = getUserData();
    // console.log(userData)
    const cars = await getMyListings(userData.id);
    // console.log(memes)
    ctx.render(myListingsTemp(cars, userData));
}


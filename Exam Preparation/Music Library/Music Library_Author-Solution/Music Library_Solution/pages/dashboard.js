import { html } from "../node_modules/lit-html/lit-html.js";
import { until } from "../node_modules/lit-html/directives/until.js";
import { loaderTemplate } from "./commonLoader.js";
import { getAllAlbums } from "../services/dataService.js";

// TODO: place template:
// TODO: name properties:
// TODO: name functions:
// TODO: if untill is needed and a loader is needed.... Remove it otherwise....:

const albumTemplate = (item) => html` <!-- Display a li with information about every post (if any)-->
    <li class="card">
        <img src="${item.imageUrl}" alt="travis" />
        <p><strong>Singer/Band: </strong><span class="singer">${item.singer}</span></p>
        <p><strong>Album name: </strong><span class="album">${item.album}</span></p>
        <p><strong>Sales:</strong><span class="sales">${item.sales}</span></p>
        <a class="details-btn" href="/details/${item._id}">Details</a>
    </li>`;

const dashboardTemplate = (data) => html`<section id="dashboard">
    <h2>Albums</h2>
    ${data.length
        ? html`
              <ul class="card-wrapper">
                  ${data.map((e) => albumTemplate(e))}
              </ul>
          `
        : html` <!-- Display an h2 if there are no posts -->
              <h2>There are no albums added yet.</h2>`}
</section>`;

export async function dashboardView(ctx) {
    console.log("dashboardView");

    const populator = async () => {
        const data = await getAllAlbums();
        console.log(data);
        return dashboardTemplate(data);
    };

    ctx.render(until(populator(), loaderTemplate()));
}

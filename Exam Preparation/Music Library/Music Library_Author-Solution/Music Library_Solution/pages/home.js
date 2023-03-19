import { html } from "../node_modules/lit-html/lit-html.js";
import { until } from "../node_modules/lit-html/directives/until.js";
import { loaderTemplate } from "./commonLoader.js";

// TODO: place template:
// TODO: name properties:
// TODO: name functions:
// TODO: if untill is needed and a loader is needed.... Remove it otherwise....:

const homeTemplate = (data) => html`<section id="home">
    <img src="./images/landing.png" alt="home" />
    <h2 id="landing-text"><span>Add your favourite albums</span> <strong>||</strong> <span>Discover new ones right here!</span></h2>
</section>`;

export async function homeView(ctx) {
    console.log("homeView");

    const populator = async () => {
        const data = "await pesho to go get the data";

        return homeTemplate(data);
    };

    ctx.render(until(populator(), loaderTemplate()));
}

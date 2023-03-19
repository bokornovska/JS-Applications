import { html } from "../node_modules/lit-html/lit-html.js";
import { until } from "../node_modules/lit-html/directives/until.js";
import { loaderTemplate } from "./commonLoader.js";

// TODO: place template:
// TODO: name properties:
// TODO: name functions:
// TODO: if untill is needed and a loader is needed.... Remove it otherwise....:

const homeTemplate = (data) => html``;

export async function homeView(ctx) {
  console.log("homeView");

  const populator = async () => {
    const data = "await pesho to go get the data";

    return homeTemplate(data);
  };

  ctx.render(until(populator(), loaderTemplate()));
}

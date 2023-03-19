import { html } from "../node_modules/lit-html/lit-html.js";
import { until } from "../node_modules/lit-html/directives/until.js";
import { loaderTemplate } from "./commonLoader.js";
import notificationService from "../services/notificationService.js";
import { createAlbum } from "../services/dataService.js";

const createTemplate = (form) => html`<section id="create">
    <div class="form">
        <h2>Add Album</h2>
        <form class="create-form" @submit=${form.submit}>
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
            <input type="text" name="album" id="album-album" placeholder="Album" />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
            <input type="text" name="release" id="album-release" placeholder="Release date" />
            <input type="text" name="label" id="album-label" placeholder="Label" />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" />

            <button type="submit">post</button>
        </form>
    </div>
</section>`;

export async function createView(ctx) {
    console.log("createView");

    const form = { submit: onSubmit, err: [] };

    ctx.render(createTemplate(form));

    async function onSubmit(e) {
        e.preventDefault();
        const data = new FormData(e.target);
        const album = {
            singer: data.get("singer").trim(),
            album: data.get("album").trim(),
            imageUrl: data.get("imageUrl").trim(),
            release: data.get("release").trim(),
            label: data.get("label").trim(),
            sales: data.get("sales").trim(),
        };
        try {
            if (Object.values(album).includes("")) {
                Object.entries(album).forEach(([k, v]) => {
                    if (v == "") {
                        form.err.push(`Field ${k} is mandatory`);
                    }
                });
            }

            if (form.err.length > 0) {
                ctx.render(createTemplate(form));
                form.err.forEach((e) => notificationService.createNotification(e));
                form.err = [];
                return;
            }

            let theNewThing = await createAlbum(album);

            ctx.page.redirect(`/dashboard`);
            // notifications must be after the redirect
            notificationService.createNotification(`Sucessfully created your album "${album.album}" by "${album.singer}"`, "success");
        } catch (err) {
            form.err = [];
            ctx.render(createTemplate(form));
            notificationService.createNotification(err.message);
            console.log(err);
        }
    }
}

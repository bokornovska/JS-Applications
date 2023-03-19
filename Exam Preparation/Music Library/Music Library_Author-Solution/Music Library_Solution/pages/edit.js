import { html } from "../node_modules/lit-html/lit-html.js";
import { until } from "../node_modules/lit-html/directives/until.js";
import { loaderTemplate } from "./commonLoader.js";
import notificationService from "../services/notificationService.js";
import { getOneById, updateOne } from "../services/dataService.js";

const editTemplate = (form) => html`<section id="edit">
    <div class="form">
        <h2>Edit Album</h2>
        <form class="edit-form" @submit=${form.submit}>
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" value="${form.data.singer}" />
            <input type="text" name="album" id="album-album" placeholder="Album" value="${form.data.album}" />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" value="${form.data.imageUrl}" />
            <input type="text" name="release" id="album-release" placeholder="Release date" value="${form.data.release}" />
            <input type="text" name="label" id="album-label" placeholder="Label" value="${form.data.label}" />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" value="${form.data.sales}" />

            <button type="submit">post</button>
        </form>
    </div>
</section>`;

export async function editView(ctx) {
    const data = await getOneById(ctx.params.id);
    const form = { submit: onSubmit, err: [], data };

    ctx.render(editTemplate(form));

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
                ctx.render(editTemplate(form));
                form.err.forEach((e) => notificationService.createNotification(e));
                form.err = [];
                return;
            }

            let theNewThing = await updateOne(form.data._id, album);

            ctx.page.redirect(`/details/${form.data._id}`);
            // notifications must be after the redirect
            notificationService.createNotification(`Sucessfully changed the album "${album.album}" by "${album.singer}"`, "success");
        } catch (err) {
            form.err = [];
            ctx.render(editTemplate(form));
            notificationService.createNotification(err.message);
            console.log(err);
        }
    }
}

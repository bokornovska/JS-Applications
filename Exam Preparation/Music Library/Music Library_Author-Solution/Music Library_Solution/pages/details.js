import { html } from "../node_modules/lit-html/lit-html.js";
import { until } from "../node_modules/lit-html/directives/until.js";
import { loaderTemplate } from "./commonLoader.js";
import { addLike, delAlbum, getmyLikes, getOneById, getTotalLikes, getUser } from "../services/dataService.js";

// TODO: place template:
// TODO: name properties:
// TODO: name functions:
// TODO: if untill is needed and a loader is needed.... Remove it otherwise....:

const detailsTemplate = (data) => html`<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
            <img src="${data.imageUrl}" alt="example1" />
        </div>
        <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${data.singer}</span></p>
            <p><strong>Album name:</strong><span id="details-album">${data.album}</span></p>
            <p><strong>Release date:</strong><span id="details-release">${data.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${data.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${data.sales}</span></p>
        </div>
        <div id="likes">Likes: <span id="likes-count">${data?.totalLikes}</span></div>

        <!--Edit and Delete are only for creator-->
        ${data.viewerId
            ? html`
                  <div id="action-buttons">
                      ${data.viewerId === data._ownerId
                          ? html`
                                <a href="/edit/${data._id}" id="edit-btn">Edit</a>
                                <a href="javascript:void(0)" @click=${() => data.del(data._id)} id="delete-btn">Delete</a>
                            `
                          : html`${data.hasLiked === 0 ? html`<a href="javascript:void(0)" id="like-btn" @click=${() => data.addLikes(data._id)}>Like</a>` : ""}`}
                  </div>
              `
            : ""}
    </div>
</section>`;

export async function detailsView(ctx) {
    console.log("detailsView");

    const populator = async () => {
        const user = getUser();
        const data = await getOneById(ctx.params.id);
        const totalLikes = await getTotalLikes(data._id);
        const dataObj = { ...data, viewerId: user?._id, totalLikes, addLikes: like, del };

        if (user) {
            dataObj.hasLiked = await getmyLikes(data._id, user._id);
        }

        console.log(dataObj);

        return detailsTemplate(dataObj, del);
    };

    ctx.render(until(populator(), loaderTemplate()));

    async function del(id) {
        if (confirm("Are you sure about that? There is no going back...")) {
            await delAlbum(id).then(res => {
                console.log(res);
                ctx.page.redirect("/dashboard");
            });
        }
    }

    async function like(id) {
        await addLike(id, { albumId: id });
        ctx.page.redirect(`/details/${id}`);
    }
}

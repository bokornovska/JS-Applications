import { html } from "../../node_modules/lit-html/lit-html.js"
import { getMyPosts } from "../api/data.js";
import { getUserData } from "../api/utils.js";



const profileTemp = (posts, userData) => {
    return html`
    <section id="my-posts-page">
        <h1 class="title">My Posts</h1>
        ${posts.length == 0
        ? html`
        <h1 class="title no-posts-title">You have no posts yet!</h1>
        `
        : html`
        <div class="my-posts"> ${posts.map(postCatdTemp)}</div>
        `}
       
    </section>
    `;
}

const postCatdTemp = (post) => html`
<div class="post">
    <h2 class="post-title">${post.title}</h2>
    <img class="post-image" src="${post.imageUrl}" alt="Material Image">
    <div class="btn-wrapper">
        <a href="/details/${post._id}" class="details-btn btn">Details</a>
    </div>
</div>
`

export async function profileView(ctx) {
    const userData = getUserData();
    // console.log(userData)
    const posts = await getMyPosts(userData.id);
    // console.log(memes)
    ctx.render(profileTemp(posts, userData));
}
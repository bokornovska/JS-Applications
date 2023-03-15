import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAll } from '../api/data.js';

const dashboardTemp = (posts) => {
    return html`
<section id="dashboard-page">
    <h1 class="title">All Posts</h1>

    <!-- Display a div with information about every post (if any)-->
    <div class="all-posts">
        ${posts.length == 0 
        ? html`
        <h1 class="title no-posts-title">No posts yet!</h1>
        `
        : posts.map(postCardTemp)}
    </div>

    <!-- Display an h1 if there are no posts -->
    
</section>
    `
};

const postCardTemp = (post) => {
    return html`
    <div class="post">
        <h2 class="post-title">${post.title}</h2>
        <img class="post-image" src=${post.imageUrl} alt="Material Image">
        <div class="btn-wrapper">
            <a href="/details/${post._id}" class="details-btn btn">Details</a>
        </div>
    </div>
    `
}

export async function dashboardView(ctx) {
    const posts = await getAll();
    // console.log(posts);
    ctx.render(dashboardTemp(posts));
}

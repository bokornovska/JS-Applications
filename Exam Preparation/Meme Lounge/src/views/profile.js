import { html } from "../../node_modules/lit-html/lit-html.js"
import { getMyMemes } from "../api/data.js";
import { getUserData } from "../api/utils.js";



const profileTemp = (memes, userData) => {
    return html`
     <section id="user-profile-page" class="user-profile">
            <article class="user-info">
                ${userData.gender == 'male'
            ? html`
            <img id="user-avatar-url" alt="user-profile" src="/images/male.png">
            `
            : html`
            <img id="user-avatar-url" alt="user-profile" src="/images/female.png">
            `}
                
                <div class="user-content">
                    <p>Username: ${userData.username}</p>
                    <p>Email: ${userData.email}</p>
                    <p>My memes count: ${memes.length}</p>
                </div>
            </article>
            <h1 id="user-listings-title">User Memes</h1>
            <div class="user-meme-listings">
                ${memes.length == 0 
                ? html`
                <p class="no-memes">No memes in database.</p>
                `
                : memes.map(memeCard)} 
            </div>
        </section>
    `;
}

const memeCard = (meme) => html`
<div class="user-meme">
    <p class="user-meme-title">${meme.title}</p>
    <img class="userProfileImage" alt="meme-img" src=${meme.imageUrl}>
    <a class="button" href="/details/${meme._id}">Details</a>
</div>
`

export async function profileView(ctx){
    const userData = getUserData();
    console.log(userData)
    const memes = await getMyMemes(userData.id);
    // console.log(memes)
    ctx.render(profileTemp(memes, userData));
}
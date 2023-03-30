import { html } from "../../node_modules/lit-html/lit-html.js";
import { getMyPosts } from "../api/data.js";
import { getUserData } from "../api/utils.js";



const profileTemp = (theaters, userData) => {
    return html`
    <section id="profilePage">
        <div class="userInfo">
            <div class="avatar">
                <img src="./images/profilePic.png">
            </div>
            <h2>${userData.email}</h2>
        </div>
        <div class="board">
            ${theaters.length === 0
                ? html`
            <div class="no-events">
                <p>This user has no events yet!</p>
            </div>
            `
            : theaters.map(theaterCardTemp)}
        </div>
    </section>
    `;
}

const theaterCardTemp = (theater) => html`
<div class="eventBoard">
    <div class="event-info">
        <img src=${theater.imageUrl}>
        <h2>${theater.title}</h2>
        <h6>${theater.date}</h6>
        <a href="/details/${theater._id}" class="details-button">Details</a>
    </div>
</div>
`

export async function profileView(ctx) {
    const userData = getUserData();
    console.log(userData)
    const theaters = await getMyPosts(userData.id);
    // console.log(memes)
    ctx.render(profileTemp(theaters, userData));
}



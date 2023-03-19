import { html } from "../node_modules/lit-html/lit-html.js";
import { getUser, isLogged, logout } from "../services/dataService.js";

const settings = {
    location,
};

const loggedInTemplate = (currLoc, user, signOutUser) => html`<!-- Logged-in users -->
    <div class="user">
        <a href="/create">Add Album</a>
        <a href="javascript:void(0)" @click=${signOutUser}>Logout</a>
    </div>`;

const guestTemplate = (currLoc) => html`<!-- Guest users -->
    <div class="guest">
        <a href="/login">Login</a>
        <a href="/register">Register</a>
    </div>`;

const navTemplate = (isUser, currLoc, user, signOutUser) => html` <a id="logo" href="/"
        ><img id="logo-img" src="/images/logo.png" alt=""
    /></a>

    <nav>
        <div>
            <a href="/dashboard">Dashboard</a>
        </div>
        ${isUser ? html`${loggedInTemplate(currLoc, user, signOutUser)}` : html`${guestTemplate()}`}
    </nav>`;

async function getView(ctx, next) {
    let currLoc = ctx.path.split("/").filter((x) => x.length > 0)[0];
    ctx.navRender(navTemplate(isLogged(), currLoc, getUser(), signOutUser));

    async function signOutUser() {
        await logout();
        ctx.page.redirect("/home");
    }
    next();
}

const nav = {
    getView,
    settings,
};

export default nav;

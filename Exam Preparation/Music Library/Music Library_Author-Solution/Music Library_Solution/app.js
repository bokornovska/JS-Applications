import page from "./node_modules/page/page.mjs";
import { html } from "./node_modules/lit-html/lit-html.js";
import { render } from "./node_modules/lit-html/lit-html.js";

import * as api from "./services/apiService.js";

import notificationService from "./services/notificationService.js";
import nav from "./pages/nav.js";
import { homeView } from "./pages/home.js";
import { loginView } from "./pages/login.js";
import { registerView } from "./pages/register.js";
import { dashboardView } from "./pages/dashboard.js";
import { createView } from "./pages/create.js";
import { detailsView } from "./pages/details.js";
import { editView } from "./pages/edit.js";

//debug
// window.api = api;
//debug

// api.clearLocalStorage();

export const baseUrl = "http://localhost:3030";

const baseTemplate = () => html`<div id="wrapper">
        <header><!-- Navigation --></header>
        <div id="alertContainer"><!-- бъ ме --></div>
        <main>
            <!-- Home page -->
            <!-- Dashboard page -->
            <!-- Register Page (Only for Guest users) -->
            <!-- Login Page (Only for Guest users) -->
            <!-- Create Page (Only for logged-in users) -->
            <!-- Details page -->
            <!-- Edit Page (Only for logged-in users) -->
        </main>
    </div>
    <footer>
        <p>@MusicLibrary</p>
    </footer>`;

const root = document.querySelector("body");
render(baseTemplate(), root);

const navLoc = root.querySelector("header");
nav.settings.location = navLoc;

const mainLoc = root.querySelector("main");

notificationService.initialize(render, document.querySelector("div#alertContainer"));

async function decoContext(ctx, next) {
    ctx.navRender = (content) => render(content, navLoc);
    ctx.render = (content) => render(content, mainLoc);
    //notifications are added here and you make a nav-like page...
    //todo make better init function...
    //todo make better notification service...
    next();
}

page(decoContext);
page(nav.getView);

page("/index.html", "/home");
page("/", "/home");

page("/home", homeView);
page("/login", loginView);
page("/register", registerView);
page("/dashboard", dashboardView);
page("/create", createView);
page("/details/:id", detailsView);
page("/edit/:id", editView);
// page("/logout", signOutUser);

page.start();

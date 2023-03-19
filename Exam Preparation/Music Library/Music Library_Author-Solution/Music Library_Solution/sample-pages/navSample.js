import { html } from "../node_modules/lit-html/lit-html.js";
import { getUser, isLogged, logout } from "../services/dataService.js";

const settings = {
  location,
};

const loggedInTemplate = (currLoc, user, signOutUser) => html``;

const guestTemplate = (currLoc) => html``;

const navTemplate = (isUser, currLoc, user, signOutUser) => html``;

async function getView(ctx, next) {
  let currLoc = ctx.path.split("/").filter((x) => x.length > 0)[0];
  ctx.navRender(navTemplate(isLogged(), currLoc, getUser(), signOutUser));
  next();
}

async function signOutUser(ctx) {
  await logout();
  ctx.page.redirect("/home");
}

const nav = {
  getView,
  settings,
};

export default nav;

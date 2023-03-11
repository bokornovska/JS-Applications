import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { logout } from '../api/user.js';
import { getUserData } from '../api/utils.js';

const navTemp = (user) => {
    return html`
      <nav>
            <section class="logo">
                <img src="./images/logo.png" alt="logo">
            </section>
            <ul>
                <!--Users and Guest-->
                <li><a href="/">Home</a></li>
                <li><a href="/catalog">Dashboard</a></li>
                ${user
                ? html`
                <li><a href="create">Create Postcard</a></li>
                <li><a @click = ${onLogout} href="javascript:void(0)">Logout</a></li>
                `
                : html`
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
                `}
                
            </ul>
        </nav>
    `
}

const root = document.getElementById('content');
const header = document.getElementById('header');

function ctxRender(content){
    render(content, root);
}

export function addRender(ctx, next){
   
    const user = getUserData();
    render(navTemp(user), header);
    ctx.render = ctxRender;

    next();
}

function onLogout(ctx) {
    logout();
    render(navTemp(null), header);
    ctx.page.redirect('/');
}
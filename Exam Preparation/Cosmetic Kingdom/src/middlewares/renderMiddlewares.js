import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { logout } from '../api/user.js';
import { getUserData } from '../api/utils.js';

const navTemp = (user) => {
    return html`
            <div>
            <a href="/catalog">Products</a>
          </div>
            ${user 
            ? html`
             <!-- Logged-in users -->
          <div class="user">
            <a href="/create">Add Product</a>
            <a @click=${onLogout} href="javascript:void(0)">Logout</a>
          </div>
            `
            : html`
             <!-- Guest users -->
          <div class="guest">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
          </div>
            `}           
    `
}

const root = document.querySelector('main');
const navigation = document.querySelector('nav');

function ctxRender(content){
    render(content, root);
}

export function addRender(ctx, next){
   
    const user = getUserData();
    render(navTemp(user), navigation);
    ctx.render = ctxRender;

    next();
}

function onLogout(ctx) {
    logout();
    render(navTemp(null), navigation);
    
   ctx.page.redirect('/catalog');
}
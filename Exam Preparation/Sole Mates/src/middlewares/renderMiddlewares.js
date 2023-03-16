import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { logout } from '../api/user.js';
import { getUserData } from '../api/utils.js';

const navTemp = (user) => {
    return html`
            <div>
            <a href="/dashboard">Dashboard</a>
            <a href="/search">Search</a>
          </div>
            ${user 
            ? html`
             <div class="user">
            <a href="create">Add Pair</a>
            <a href="#">Logout</a>
          </div>
            `
            : html`
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
    
   ctx.page.redirect('/');
}
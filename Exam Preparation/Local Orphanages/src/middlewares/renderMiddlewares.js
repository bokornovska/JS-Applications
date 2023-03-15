import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { logout } from '../api/user.js';
import { getUserData } from '../api/utils.js';

const navTemp = (user) => {
    return html`
            <a href="/">Dashboard</a>
            ${user 
            ? html`
            <div id="user">
                    <a href="/posts">My Posts</a>
                    <a href="/create">Create Post</a>
                    <a @click=${onLogout} href="javascript:void(0)">Logout</a>
            </div>
            `
            : html`
            <div id="guest">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
            </div>
            `}           
    `
}

const root = document.getElementById('main-content');
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
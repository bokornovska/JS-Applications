import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { logout } from '../api/user.js';
import { getUserData } from '../api/utils.js';

const navTemp = (user) => {
   
    return html`
        <a href="/">Theater</a>
            <ul>
            ${user 
            ? html`
                <li><a href="/profile">Profile</a></li>
                <li><a href="/create">Create Event</a></li>
                <li><a @click=${onLogout} href="javascript:void(0)">Logout</a></li>
                `
            : html`
                <li><a href="/login">Login</a></li>
                <li><a href="/register">Register</a></li>
                `
            }    
            </ul>
        `
}

const root = document.getElementById('content');
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
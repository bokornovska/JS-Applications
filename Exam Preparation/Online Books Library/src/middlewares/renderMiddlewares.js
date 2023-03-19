import {html, render} from '../../node_modules/lit-html/lit-html.js';
import { logout } from '../api/user.js';
import { getUserData } from '../api/utils.js';

const navTemp = (user) => {
    return html`
    <section class="navbar-dashboard">
      <a href="/dashboard">Dashboard</a>
            ${user 
            ? html`
             <!-- Logged-in users -->
             <div id="user">
                <span>Welcome, ${user.email}</span>
                  <a class="button" href="/myBooks">My Books</a>
                  <a class="button" href="/add">Add Book</a>
                  <a @click=${onLogout} class="button" href="javascript:void(0)">Logout</a>
            </div>
            `
            : html`
             <!-- Guest users -->
          <div id="guest">
              <a class="button" href="/login">Login</a>
              <a class="button" href="/register">Register</a>
          </div>
            `}  
    </section>         
    `
}

const root = document.getElementById('site-content');
const navigation = document.querySelector('.navbar');

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
    
   ctx.page.redirect('/dashboard');
}
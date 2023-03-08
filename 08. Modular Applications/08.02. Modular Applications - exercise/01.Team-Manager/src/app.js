import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';
import { homeView } from './view/home.js';
import { loginView } from './view/login.js';
import { registerView } from './view/register.js';
import { browseView } from './view/browse.js';
import { createView } from './view/create.js';
import { editView } from './view/edit.js';
import { myTeamView } from './view/myteams.js';
import { teamDetailsView } from './view/details.js';
import { logout } from './api/data.js';

const rootElement = document.getElementsByTagName('main')[0];

page(middleWare);

page('/', homeView);
page('/index.html', homeView);
page('/login', loginView);
page('/register', registerView);
page('/browse', browseView);
page('/create', createView);
page('/edit/:id', editView);
page('/my-team', myTeamView);
page('/details/id:', teamDetailsView);

page.start();

function middleWare(ctx, next){
    ctx.render = (content) => render(content, rootElement);
    ctx.updateNav = updateNav();
    // updateNav();
    next();
}

document.querySelector('.logout').addEventListener('click', async(e) => {
    e.preventDefault();
    await logout();

    updateNav();
    page.redirect('/');
});

function updateNav(){
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    if(userData){
        document.querySelectorAll('.guest').forEach(x => x.style.display = "none");
        document.querySelectorAll('.user').forEach(x => x.style.display = "block");

    }else{
        document.querySelectorAll('.user').forEach(x => x.style.display = "none");
        document.querySelectorAll('.guest').forEach(x => x.style.display = "block");

    }
}
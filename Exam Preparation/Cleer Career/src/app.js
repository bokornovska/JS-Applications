import page from '../node_modules/page/page.mjs';
import { addRender } from './middlewares/renderMiddlewares.js';
import { addSession } from './middlewares/sessionMiddleware.js';
import { createView } from './view/create.js';
import { dashboardView } from './view/dashboard.js';
import { detailsView } from './view/details.js';
import { editView } from './view/edit.js';
import { homeView } from './view/home.js';
import { loginView } from './view/login.js';
import { registerView } from './view/register.js';


page(addSession);
page(addRender);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/dashboard', dashboardView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView );

page.start();

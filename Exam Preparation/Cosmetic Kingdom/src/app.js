import page from '../node_modules/page/page.mjs';
import { addRender } from './middlewares/renderMiddlewares.js';
import { addSession } from './middlewares/sessionMiddleware.js';
import { dashboardView } from './views/catalog.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';

page(addSession);
page(addRender);
page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/catalog', dashboardView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView)




page.start();
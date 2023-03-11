import page from '../node_modules/page/page.mjs';

import { createView } from './views/create.js';
import { dashboardView } from './views/catalog.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';
import { addRender } from './middlewares/renderMiddlewares.js';
import { addSession } from './middlewares/sessionMiddleware.js';

page(addSession);
page(addRender);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/details/:id', detailsView);
page('/catalog', dashboardView);
page('/create', createView);
page('/edit/:id', editView);

page.start();


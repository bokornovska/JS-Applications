import page from '../node_modules/page/page.mjs';
import { addRender } from './middlewares/renderMiddlewares.js';
import { addSession } from './middlewares/sessionMiddleware.js';
import { dashboardView } from './views/dashboard.js';
import { detailsView } from './views/details.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';

page(addSession);
page(addRender);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/dashboard', dashboardView);
page('/details/:id', detailsView);

// page('/create', createView);
// page('/edit/:id', editView );
// page('/posts', profileView);

page.start();

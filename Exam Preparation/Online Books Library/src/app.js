import page from '../node_modules/page/page.mjs';
import { addRender } from './middlewares/renderMiddlewares.js';
import { addSession } from './middlewares/sessionMiddleware.js';
import { createView } from './views/create.js';
import { dashboardView } from './views/dashboard.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { loginView } from './views/login.js';
import { myBooksView } from './views/my-books.js';
import { registerView } from './views/register.js';

page(addSession);
page(addRender);
page('/login', loginView);
page('/register', registerView);
page('/dashboard', dashboardView);
page('/details/:id', detailsView);
page('/add', createView);
page('/edit/:id', editView);
page('/myBooks', myBooksView)


page.start();
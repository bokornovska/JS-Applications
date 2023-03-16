import page from '../node_modules/page/page.mjs';
import { addRender } from './middlewares/renderMiddlewares.js';
import { addSession } from './middlewares/sessionMiddleware.js';
import { homeView } from './views/home.js';

page(addSession);
page(addRender);

page('/', homeView);
// page('/login', loginView);
// page('/register', registerView);
// page('/create', createView);
// page('/details/:id', detailsView);
// page('/edit/:id', editView );
// page('/posts', profileView);

page.start();

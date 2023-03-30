import page from '../node_modules/page/page.mjs';


import { addRender } from './middlewares/renderMiddlewares.js';
import { addSession } from './middlewares/sessionMiddleware.js';
import { allListingsView } from './views/all-listings.js';
import { createView } from './views/create.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { myListingsView } from './views/my-listings.js';
import { registerView } from './views/register.js';
import { searchView } from './views/search.js';



page(addSession);
page(addRender);

page('/', homeView);
page('/login', loginView);
page('/register', registerView);
page('/all-listings', allListingsView);
page('/create', createView);
page('/details/:id', detailsView);
page('/edit/:id', editView );
page('/my-listings', myListingsView)
page('/search', searchView);



page.start();

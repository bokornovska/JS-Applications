import page from '../node_modules/page/page.mjs';
import { createView } from './views/create.js';
import { dashboardView } from './views/dashboard.js';
import { detailsView } from './views/details.js';
import { editView } from './views/edit.js';
import { homeView } from './views/home.js';
import { loginView } from './views/login.js';
import { registerView } from './views/register.js';

page('/', homeView);
page('/create', createView);
page('/dashboard', dashboardView);
page('/details', detailsView);
page('edit', editView);
page('/login', loginView);
page('/register', registerView)

page.start();
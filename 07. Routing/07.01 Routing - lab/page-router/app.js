import page from './node_modules/page/page.mjs';
import { articlesView } from './views/articles.js';
import { homeView } from './views/home.js';
import { aboutView } from './views/about.js';
import { articleDetailsView } from './views/articleDetails.js';
import { createView } from './views/create.js';

page('/home', homeView);
page('/articles', articlesView);
page('/about', aboutView);
page('/articles/:articleId', articleDetailsView)
page('/create', createView)


page.start();
import { render } from '../../node_modules/lit-html/lit-html.js';

import { html } from '../../node_modules/lit-html/lit-html.js';
import { navigationTemp } from '../views/navigationView.js';


const root = document.getElementById('root');

const ctxRender = (ctx, templateResult) => {
    let layout = html`
    <nav>
        ${navigationTemp(ctx)}
    </nav>
    <main>
        ${templateResult}
    </main>
    `
    render(layout, root);
}

export const renderMiddleware = (ctx, next) => {

    ctx.render = ctxRender.bind(null, ctx);
    next();
}


import { render } from '../../node_modules/lit-html/lit-html.js';
import { navigationView } from '../views/navigationView.js';

const headerElement = document.querySelector('.header-nav')

export const renderNavigation = (ctx, next) => {

    render(navigationView(ctx), headerElement)

    next();
}
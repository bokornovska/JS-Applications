import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubbmitHandler } from '../api/utils.js';
import { login } from '../api/user.js';


const loginTemp = (onSubmit) => {
    return html`
<section id="loginaPage">
    <form @submit="${onSubmit}" class="loginForm">
        <h2>Login</h2>
        <div>
            <label for="email">Email:</label>
            <input id="email" name="email" type="text" placeholder="steven@abv.bg" value="">
        </div>
        <div>
            <label for="password">Password:</label>
            <input id="password" name="password" type="password" placeholder="********" value="">
        </div>

        <button class="btn" type="submit">Login</button>

        <p class="field">
            <span>If you don't have profile click <a href="/register">here</a></span>
        </p>
    </form>
</section>
    `
};

export function loginView(ctx) {
    ctx.render(loginTemp(createSubbmitHandler(onSubmit)));

    async function onSubmit({ email, password }) {

        if (email == '' || password == '') {
            return alert('All fields are required!')
        };

        await login(email, password);
        ctx.page.redirect('/');
    }
}



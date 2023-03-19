import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubbmitHandler } from '../api/utils.js';
import { login } from '../api/user.js';


const loginTemp = (onSubmit) => {
    return html`
    <section id="login-page" class="login">
        <form @submit=${onSubmit} id="login-form" action="" method="">
            <fieldset>
                <legend>Login Form</legend>
                <p class="field">
                    <label for="email">Email</label>
                    <span class="input">
                        <input type="text" name="email" id="email" placeholder="Email">
                    </span>
                </p>
                <p class="field">
                    <label for="password">Password</label>
                    <span class="input">
                        <input type="password" name="password" id="password" placeholder="Password">
                    </span>
                </p>
                <input class="button submit" type="submit" value="Login">
            </fieldset>
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
        ctx.page.redirect('/dashboard');
    }
}
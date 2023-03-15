import {html} from '../../node_modules/lit-html/lit-html.js';
import { createSubbmitHandler } from '../api/utils.js';
import { register } from '../api/user.js';


const registerTemp = (onSubmit) => {
    return html`
    <!-- Welcome Page ( Only for guest users ) -->
    <section id="register-page" class="auth">
            <form @submit=${onSubmit} id="register">
                <h1 class="title">Register</h1>

                <article class="input-group">
                    <label for="register-email">Email: </label>
                    <input type="email" id="register-email" name="email">
                </article>

                <article class="input-group">
                    <label for="register-password">Password: </label>
                    <input type="password" id="register-password" name="password">
                </article>

                <article class="input-group">
                    <label for="repeat-password">Repeat Password: </label>
                    <input type="password" id="repeat-password" name="repeatPassword">
                </article>

                <input type="submit" class="btn submit-btn" value="Register">
            </form>
        </section>

    `
};

export function registerView(ctx) {
    ctx.render(registerTemp(createSubbmitHandler(onSubmit)));

    async function onSubmit({email, password, repeatPassword}){

        if(email == '' || password == '' || repeatPassword == ''){
            return alert('All fields are required!')
        };

        if(password !== repeatPassword){
            return alert('password don`t match')
        }

        await register(email, password);
        ctx.page.redirect('/');
    }
}
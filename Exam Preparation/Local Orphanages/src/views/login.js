import {html} from '../../node_modules/lit-html/lit-html.js';
import { createSubbmitHandler } from '../api/utils.js';
import {login} from '../api/user.js';


const loginTemp = (onSubmit) => {
    return html`
   <section id="login-page" class="auth">
            <form @submit="${onSubmit}" id="login">
                <h1 class="title">Login</h1>

                <article class="input-group">
                    <label for="login-email">Email: </label>
                    <input type="email" id="login-email" name="email">
                </article>

                <article class="input-group">
                    <label for="password">Password: </label>
                    <input type="password" id="password" name="password">
                </article>

                <input type="submit" class="btn submit-btn" value="Log In">
            </form>
        </section>
    `
};

export function loginView(ctx) {
    ctx.render(loginTemp(createSubbmitHandler(onSubmit)));

     async function onSubmit({email, password}){
        
        if(email == '' || password == ''){
            return alert('All fields are required!')
        };

        await login(email, password);
        ctx.page.redirect('/');
    }
}
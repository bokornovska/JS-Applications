import {html} from '../../node_modules/lit-html/lit-html.js';
import { createSubbmitHandler } from '../api/utils.js';
import {login} from '../api/user.js';
import { notify } from '../api/notify.js';

const loginTemp = (onSubmit) => {
    return html`
   <section id="login">
            <form @submit=${onSubmit} id="login-form">
                <div class="container">
                    <h1>Login</h1>
                    <label for="email">Email</label>
                    <input id="email" placeholder="Enter Email" name="email" type="text">
                    <label for="password">Password</label>
                    <input id="password" type="password" placeholder="Enter Password" name="password">
                    <input type="submit" class="registerbtn button" value="Login">
                    <div class="container signin">
                        <p>Dont have an account?<a href="/register">Sign up</a>.</p>
                    </div>
                </div>
            </form>
        </section>
    `
};

export function loginView(ctx) {
    ctx.render(loginTemp(createSubbmitHandler(onSubmit)));

     async function onSubmit({email, password}){
        
        if(email == '' || password == ''){
            return notify('All fields are required!')
        };

        await login(email, password);
        ctx.page.redirect('/catalog')
    }
}
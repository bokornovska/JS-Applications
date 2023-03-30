import {html} from '../../node_modules/lit-html/lit-html.js';
import { createSubbmitHandler } from '../api/utils.js';
import {login} from '../api/user.js';


const loginTemp = (onSubmit) => {
    return html`
    <section id="login">
            <div class="container">
                <form @submit=${onSubmit} id="login-form" action="#" method="post">
                    <h1>Login</h1>
                    <p>Please enter your credentials.</p>
                    <hr>

                    <p>Username</p>
                    <input placeholder="Enter Username" name="username" type="text">

                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" name="password">
                    <input type="submit" class="registerbtn" value="Login">
                </form>
                <div class="signin">
                    <p>Dont have an account?
                        <a href="/register">Sign up</a>.
                    </p>
                </div>
            </div>
        </section>

    `
};

export function loginView(ctx) {
    ctx.render(loginTemp(createSubbmitHandler(onSubmit)));

     async function onSubmit({username, password}){
        
        if(username == '' || password == ''){
            return alert('All fields are required!')
        };

        await login(username, password);
        ctx.page.redirect('/all-listings');
    }
}
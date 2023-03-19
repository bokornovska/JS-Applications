import {html} from '../../node_modules/lit-html/lit-html.js';
import { createSubbmitHandler } from '../api/utils.js';
import { register } from '../api/user.js';


const registerTemp = (onSubmit) => {
    return html`
    <section id="register-page" class="register">
            <form @submit=${onSubmit} id="register-form" action="" method="">
                <fieldset>
                    <legend>Register Form</legend>
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
                    <p class="field">
                        <label for="repeat-pass">Repeat Password</label>
                        <span class="input">
                            <input type="password" name="confirm-pass" id="repeat-pass" placeholder="Repeat Password">
                        </span>
                    </p>
                    <input class="button submit" type="submit" value="Register">
                </fieldset>
            </form>
        </section>
    `
};

export function registerView(ctx) {
    ctx.render(registerTemp(createSubbmitHandler(onSubmit)));

    async function onSubmit(data){

        if(data.email == '' || data.password == '' || data['confirm-pass'] == ''){
            return alert('All fields are required!')
        };

        if(data.password !== data['confirm-pass']){
            return alert('password don`t match')
        }

        await register(data.email, data.password);
        ctx.page.redirect('/dashboard');
    }
}
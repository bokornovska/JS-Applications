import {html} from '../../node_modules/lit-html/lit-html.js';
import { createSubbmitHandler } from '../api/utils.js';
import {login} from '../api/user.js';


const loginTemp = (onSubmit) => {
    return html`
    <section id="login">
          <div class="form">
            <h2>Login</h2>
            <form @submit=${onSubmit} class="login-form">
              <input type="text" name="email" id="email" placeholder="email" />
              <input
                type="password"
                name="password"
                id="password"
                placeholder="password"
              />
              <button type="submit">login</button>
              <p class="message"> Not registered? <a href="/register">Create an account</a>
              </p>
            </form>
          </div>
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
        ctx.page.redirect('/catalog');
    }
}
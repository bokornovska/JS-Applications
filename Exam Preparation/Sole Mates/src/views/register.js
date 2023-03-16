import {html} from '../../node_modules/lit-html/lit-html.js';
import { createSubbmitHandler } from '../api/utils.js';
import { register } from '../api/user.js';


const registerTemp = (onSubmit) => {
    return html`
   <section id="register">
          <div class="form">
            <h2>Register</h2>
            <form @submit=${onSubmit} class="login-form">
              <input
                type="text"
                name="email"
                id="register-email"
                placeholder="email"
              />
              <input
                type="password"
                name="password"
                id="register-password"
                placeholder="password"
              />
              <input
                type="password"
                name="re-password"
                id="repeat-password"
                placeholder="repeat password"
              />
              <button type="submit">login</button>
              <p class="message">Already registered? <a href="/login">Login</a></p>
            </form>
          </div>
        </section>
    `
};

export function registerView(ctx) {

    const submitHandler = (e) => {
      e.preventDefault();
    
      let formData = new FormData(e.currentTarget);
      const {email, password} = Object.fromEntries(formData);
      const confPass = formData.get('re-password');
    
      if(email == '' || password == ''){
          alert('invalid fields');
          return;
      }
      if(confPass != password){
          alert('Passwords don`t match');
    
          return;
      }
    
      register(email, password)
      .then(() => {
          ctx.page.redirect('/dashboard');
      })
      .catch(err => {
          alert(err);
      })
    }
  
    ctx.render(registerTemp(submitHandler));
}
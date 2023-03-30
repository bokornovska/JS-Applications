import {html} from '../../node_modules/lit-html/lit-html.js';
import { register } from '../api/user.js';


const registerTemp = (onSubmit) => {
    return html`
    <section id="register">
            <div class="container">
                <form @submit=${onSubmit} id="register-form">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr>

                    <p>Username</p>
                    <input type="text" placeholder="Enter Username" name="username" required>

                    <p>Password</p>
                    <input type="password" placeholder="Enter Password" name="password" required>

                    <p>Repeat Password</p>
                    <input type="password" placeholder="Repeat Password" name="repeatPass" required>
                    <hr>

                    <input type="submit" class="registerbtn" value="Register">
                </form>
                <div class="signin">
                    <p>Already have an account?
                        <a href="/login">Sign in</a>.
                    </p>
                </div>
            </div>
        </section>
    `
};

export function registerView(ctx) {

    const submitHandler = (e) => {
      e.preventDefault();
    
      let formData = new FormData(e.currentTarget);
      const {username, password} = Object.fromEntries(formData);
      const confPass = formData.get('repeatPass');
    
      if(username == '' || password == ''){
          alert('invalid fields');
          return;
      }
      if(confPass != password){
          alert('Passwords don`t match');
    
          return;
      }
    
      register(username, password)
      .then(() => {
          ctx.page.redirect('/all-listings');
      })
      .catch(err => {
          alert(err);
      })
    }
  
    ctx.render(registerTemp(submitHandler));
}
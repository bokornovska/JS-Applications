import { html } from "../node_modules/lit-html/lit-html.js";
import { register } from "../services/dataService.js";
import notificationService from "../services/notificationService.js";

const registerTemplate = (form) => html`<section id="register">
<div class="form">
    <h2>Register</h2>
    <form class="login-form" @submit=${form.submit}>
        <input type="text" name="email" id="register-email" placeholder="email" />
        <input type="password" name="password" id="register-password" placeholder="password" />
        <input type="password" name="re-password" id="repeat-password" placeholder="repeat password" />
        <button type="submit">register</button>
        <p class="message">Already registered? <a href="/login">Login</a></p>
    </form>
</div>
</section>`;

export async function registerView(ctx) {
  const form = { submit: onSubmit, err: [] };
  ctx.render(registerTemplate(form));

  async function onSubmit(e) {
    try {
      e.preventDefault();
      const data = new FormData(e.target);
      const newUser = {
        email: data.get("email").trim(),
        password: data.get("password").trim(),
        repass: data.get("re-password").trim(),
      };

      if (Object.values(newUser).includes("")) {
        Object.entries(newUser).forEach(([k, v]) => {
          if (v == "") {
            form.err.push(`Field ${k} is mandatory`);
          }
        });
      }

      if (newUser.repass !== newUser.password) {
        form.err.push("Passwords do not match");
      }

      if (form.err.length > 0) {
        ctx.render(registerTemplate(form));
        form.err.forEach((e) => notificationService.createNotification(e));
        form.err = [];
        return;
      }

      await register(newUser);
      ctx.page.redirect("/home");
      // notifications must be after the redirect
      notificationService.createNotification(`Wellcome, ${newUser.email}`, "success");
    } catch (err) {
      ctx.render(registerTemplate(form));
      notificationService.createNotification(err.message);
      form.err = [];
      console.log(err);
    }
  }
}

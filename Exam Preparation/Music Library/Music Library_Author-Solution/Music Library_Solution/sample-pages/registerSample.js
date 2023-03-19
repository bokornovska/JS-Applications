import { html } from "../node_modules/lit-html/lit-html.js";
import { register } from "../services/dataService.js";
import notificationService from "../services/notificationService.js";

const registerTemplate = (form) => html``;

export async function registerView(ctx) {
  const form = { submit: onSubmit, err: [] };
  ctx.render(registerTemplate(form));

  async function onSubmit(e) {
    try {
      e.preventDefault();
      const data = new FormData(e.target);
      const newUser = {
        email: data.get("email").trim(),
        username: data.get("username").trim(),
        password: data.get("password").trim(),
        repass: data.get("repeatPass").trim(),
        gender: data.get("gender").trim(),
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
      notificationService.createNotification(`Wellcome, ${user.email}`, "success");
    } catch (err) {
      ctx.render(registerTemplate(form));
      notificationService.createNotification(err.message);
      form.err = [];
      console.log(err);
    }
  }
}

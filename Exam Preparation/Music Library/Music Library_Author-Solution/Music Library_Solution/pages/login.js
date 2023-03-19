import { html } from "../node_modules/lit-html/lit-html.js";
import { login } from "../services/dataService.js";
import notificationService from "../services/notificationService.js";

const loginTemplate = (form) => html`<section id="login">
    <div class="form">
        <h2>Login</h2>
        <form class="login-form" @submit=${form.submit}>
            <input type="text" name="email" id="email" placeholder="email" />
            <input type="password" name="password" id="password" placeholder="password" />
            <button type="submit">login</button>
            <p class="message">Not registered? <a href="/register">Create an account</a></p>
        </form>
    </div>
</section>`;

export async function loginView(ctx) {
    const form = { submit: onSubmit, err: [] };

    ctx.render(loginTemplate(form));

    async function onSubmit(e) {
        try {
            e.preventDefault();
            // mind the fields -- username or email or whatever?
            const data = new FormData(e.target);
            const user = {
                email: data.get("email").trim(),
                password: data.get("password").trim(),
            };

            if (Object.values(user).includes("")) {
                Object.entries(user).forEach(([k, v]) => {
                    if (v == "") {
                        form.err.push(`Field ${k} is mandatory`);
                    }
                });
            }

            if (form.err.length > 0) {
                ctx.render(loginTemplate(form));
                form.err.forEach((e) => notificationService.createNotification(e));
                form.err = [];
                return;
            }

            await login(user);
            ctx.page.redirect("/home");
            // notifications must be after the redirect
            notificationService.createNotification(`Wellcome, ${user.email}`, "success");
        } catch (err) {
            ctx.render(loginTemplate(form));
            notificationService.createNotification(err.message);
            form.err = [];
        }
    }
}

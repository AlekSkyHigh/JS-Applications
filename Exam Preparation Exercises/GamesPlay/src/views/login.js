import { html } from '../../node_modules/lit-html/lit-html.js';
import { login } from '../data/auth.js';
import { createSubmitHandler } from '../util.js';

// TODO Replace with actual view
const loginTemplate = (onLogin) => html`
<!-- Login Page ( Only for Guest users ) -->
        <section id="login-page" class="auth">
            <form id="login" @submit=${onLogin}>

                <div class="container">
                    <div class="brand-logo"></div>
                    <h1>Login</h1>
                    <label for="email">Email:</label>
                    <input type="email" id="email" name="email" placeholder="Sokka@gmail.com">

                    <label for="login-pass">Password:</label>
                    <input type="password" id="login-password" name="password">
                    <input type="submit" class="btn submit" value="Login">
                    <p class="field">
                        <span>If you don't have profile click <a href="/register">here</a></span>
                    </p>
                </div>
            </form>
        </section>`;

export function loginPage(ctx){
    ctx.render(loginTemplate(createSubmitHandler(onLogin)));

    // TODO change user object based on requirements
    async function onLogin({email, password}, form){
        await login(email, password);
        form.reset();
        // TODO use redicrect location from requirements
        ctx.page.redirect('/');
    }
}
 

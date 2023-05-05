import { html } from '../../node_modules/lit-html/lit-html.js';
import { register } from '../data/auth.js';
import { createSubmitHandler } from '../util.js';
import { notification } from './notification.js';

// TODO Replace with actual view
const registerTemplate = (onRegister) => html`
<section id="register">
    <form @submit=${onRegister} id="register-form">
        <div class="container">
            <h1>Register</h1>
            <label for="username">Username</label>
            <input id="username" type="text" placeholder="Enter Username" name="username">
            <label for="email">Email</label>
            <input id="email" type="text" placeholder="Enter Email" name="email">
            <label for="password">Password</label>
            <input id="password" type="password" placeholder="Enter Password" name="password">
            <label for="repeatPass">Repeat Password</label>
            <input id="repeatPass" type="password" placeholder="Repeat Password" name="repeatPass">
            <div class="gender">
                <input type="radio" name="gender" id="female" value="female">
                <label for="female">Female</label>
                <input type="radio" name="gender" id="male" value="male" checked>
                <label for="male">Male</label>
            </div>
            <input type="submit" class="registerbtn button" value="Register">
            <div class="container signin">
                <p>Already have an account?<a href="/login">Sign in</a>.</p>
            </div>
        </div>
    </form>
</section>`;

export function registerPage(ctx) {
    ctx.render(registerTemplate(createSubmitHandler(onRegister)));

    // TODO change user object based on requirements
    async function onRegister({username, email, password, ['repeatPass']:repass }, form) {
        if (email == '' || password == '') {
            return notification('All fields are required');
        }
        if (password != repass) {
            return notification('Passwords don\`t match');
        }
        await register(username, email, password);
        form.reset();
        // TODO use redicrect location from requirements
        ctx.page.redirect('/all-memes');
    }
}

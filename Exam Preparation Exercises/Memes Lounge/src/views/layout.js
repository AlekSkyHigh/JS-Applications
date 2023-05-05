import { html } from '../../node_modules/lit-html/lit-html.js';

// TODO replace with actual layout
export const layoutTemplate = (userData, content) => html`
<nav>
    <a href="/all-memes">All Memes</a>
    ${userData
        ? html`
    <!-- Logged users -->
        <div class="user">
            <a href="/create">Create Meme</a>
        <div class="profile">
            <span>Welcome, ${userData.email}</span>
            <a href="/profile">My Profile</a>
            <a href="/logout">Logout</a>
        </div>
        </div> `
        : html`
    <!-- Guest users -->
        <div class="guest">
        <div class="profile">
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        </div>
        <a class="active" href="/">Home Page</a>
        </div>`
    }
</nav>

<section id="notifications">
        <div id="errorBox" class="notification">
            <span>MESSAGE</span>
        </div>
</section>

<main>
    ${content}
</main>`; 

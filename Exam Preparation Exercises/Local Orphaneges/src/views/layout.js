import { html } from '../../node_modules/lit-html/lit-html.js';

// TODO replace with actual layout
export const layoutTemplate = (userData, content) => html`
<header>
            <!-- Navigation -->
            <h1><a href="/">Orphelp</a></h1>
            <nav>
                <a href="/dashboard">Dashboard</a>
                ${
                userData
                ? html `<!-- Logged-in users -->
                    <div id="user">
                    <a href="/my-posts">My Posts</a>
                    <a href="/create">Create Post</a>
                    <a href="/logout">Logout</a>
                    </div>`
                : html `<!-- Guest users -->
                    <div id="guest">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                    </div>`
                }
            </nav>
        </header>
<main>
    ${content}
</main>`; 

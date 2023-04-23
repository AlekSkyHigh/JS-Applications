import { html } from '../../node_modules/lit-html/lit-html.js';


export const layoutTemplate = (userData, content) => html`
        <header>
            <!-- Navigation -->
            <h1><a class="home" href="/">GamesPlay</a></h1>
            <nav>
                <a href="/catalogue">All games</a>
                <!-- Logged-in users -->
                ${userData ? html`
                <div id="user">
                    <a href="/create-game">Create Game</a>
                    <a href="/logout">Logout</a>
                </div>`: html`
                <!-- Guest users -->
                <div id="guest">
                    <a href="/login">Login</a>
                    <a href="/register">Register</a>
                </div>`
                }
            </nav>
        </header>
        <!-- Main Content -->
        <main id="main-content">
            ${content}
        </main>`; 

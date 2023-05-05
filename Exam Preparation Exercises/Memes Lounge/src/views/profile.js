import { html } from '../../node_modules/lit-html/lit-html.js';
import { getUserData } from '../util.js';
import { getUserMemes } from '../data/services.js';

const profilePageTemplate = (userData, userMemes) => html`
<section id="user-profile-page" class="user-profile">
    <article class="user-info">
        <img id="user-avatar-url" alt="user-profile" src="/images/female.png">
        <div class="user-content">
            <p>Username: ${userData.username}</p>
            <p>Email: ${userData.email}</p>
            <p>My memes count: ${userMemes.length}</p>
        </div>
    </article>
    <h1 id="user-listings-title">User Memes</h1>
    <div class="user-meme-listings">
        ${userMemes.length == 0
        ? html`<p class="no-memes">No memes in database.</p>`
        : html`${userMemes.map(createdMemesPreview)}`
        }
    </div>
</section>`;

const createdMemesPreview = (meme) => html`
        <div class="user-meme">
            <p class="user-meme-title">${meme.title}</p>
            <img class="userProfileImage" alt="meme-img" src="${meme.imageUrl}">
            <a class="button" href="/details/${meme._id}">Details</a>
        </div>`;

export async function profilePage(ctx) {

    const userData = getUserData();

    if (userData && userData._id) {
        const userMemes = await getUserMemes(userData._id)
        ctx.render(profilePageTemplate(userData, userMemes))
    }
}

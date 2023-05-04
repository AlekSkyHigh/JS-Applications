import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllMemes } from '../data/services.js';

const allMemesTemplate = (memes) => html`
<section id="meme-feed">
    <h1>All Memes</h1>
    <div id="memes">
        ${
        memes.length == 0
        ? html `<p class="no-memes">No memes in database.</p>`
        : html `${memes.map(memePreviewTemplate)}`
        }
    </div>
</section>`;


const memePreviewTemplate = (meme) => html`
<div class="meme">
    <div class="card">
        <div class="info">
            <p class="meme-title">${meme.title}</p>
            <img class="meme-image" alt="meme-img" src="${meme.imageUrl}">
        </div>
        <div id="data-buttons">
            <a class="button" href="/details/${meme._id}">Details</a>
        </div>
    </div>
</div>`;



export async function allMemesPage(ctx) {
    const memes = await getAllMemes();
    ctx.render(allMemesTemplate(memes));
}

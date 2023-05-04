import { html } from '../../node_modules/lit-html/lit-html.js';
import { getMeme, deleteMeme } from '../data/services.js';
import { getUserData } from '../util.js';

const detailsPageTemplate = (meme, isOwner, onDelete) => html`
<section id="meme-details">
    <h1>Meme Title: ${meme.title}</h1>
    <div class="meme-details">
        <div class="meme-img">
            <img alt="meme-alt" src="${meme.imageUrl}">
        </div>
        <div class="meme-description">
            <h2>Meme Description</h2>
            <p>${meme.description}</p>

            <!-- Buttons Edit/Delete should be displayed only for creator of this meme  -->
            ${
                isOwner
                ? html `
                    <a class="button warning" href="/edit/${meme._id}">Edit</a>
                    <button @click=${onDelete} class="button danger">Delete</button>`
                : null
            }
    
        </div>
    </div>
</section>
`


export async function detailsPage(ctx) {

    const memeId = ctx.params.id;
    const meme = await getMeme(memeId);
    const user = getUserData();
    const isOwner = user && (user._id === meme._ownerId)

    async function onDelete() {
        const confirmed = confirm(`Are you sure you want to delete ${meme.title}?`)
        if (confirmed) {
            await deleteMeme(memeId);
            ctx.page.redirect('/all-memes');
        }
    }

    ctx.render(detailsPageTemplate(meme, isOwner, onDelete))


}

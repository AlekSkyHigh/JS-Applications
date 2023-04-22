import { html } from '../../node_modules/lit-html/lit-html.js';
import { gamePreview } from '../game-preview.js';
import { getAllGames } from '../data/services.js'

const catalogueTemplate = (games) => html`<section id="catalog-page">
            <h1>All Games</h1>
            ${games.length === 0 
                ? html`<h3 class="no-articles">No articles yet</h3>`
                : html `${games.map(gamePreview)}`};
</section>
`;

export async function cataloguePage(ctx){
    const games = await getAllGames();
    ctx.render(catalogueTemplate(games));
}

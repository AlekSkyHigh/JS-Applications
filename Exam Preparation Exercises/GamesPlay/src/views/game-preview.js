import { html } from "../../node_modules/lit-html/lit-html.js";

export const gamePreview = (game) => html`
<div class="allGames">
    <div class="allGames-info">
        <img src="${game.imageUrl}">
        <h6>${game.category}</h6>
        <h2>${game.title}</h2>
        <a href="/details/${game.id}" class="details-button">Details</a>
    </div>
</div>
`

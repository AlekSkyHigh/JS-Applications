import { html } from '../../node_modules/lit-html/lit-html.js';
import { getAllAlbums } from '../data/services.js';
import { albumPreview } from './album-preview.js';

const dashboardTemplate = (albums) => html`
<section id="dashboard">
    <h2>Albums</h2>
    ${albums.length == 0 
    ? html `<h2>There are no albums added yet.</h2>`
    : html `<ul class="card-wrapper">${albums.map(albumPreview)}</ul>`}
</section>`;


export async function dashboardPage(ctx) {

    const albums = await getAllAlbums();
    ctx.render(dashboardTemplate(albums))

}

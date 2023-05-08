import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllAlbums } from "../data/services.js";
import { getUserData } from "../util.js";

const catalogTemplate = (albums, userData) => html`
<section id="catalogPage">
    <h1>All Albums</h1>
            ${
            albums.length == 0
            ? html `<p>No Albums in Catalog!</p>`
            : html `${albums.map(x => albumPreviewTemplate(x, userData))}`
            }
        </section>
`;


const albumPreviewTemplate = (album, userData) => html `
<div class="card-box">
                <img src="${album.imgUrl}">
                <div>
                    <div class="text-center">
                        <p class="name">Name: ${album.name}</p>
                        <p class="artist">Artist: ${album.artist}</p>
                        <p class="genre">Genre: ${album.genre}</p>
                        <p class="price">Price: $${album.price}</p>
                        <p class="date">Release Date: ${album.releaseDate}</p>
                    </div>
                    <div class="btn-group">
                        ${userData
                        ? html `<a href="/details/${album._id}" id="details">Details</a>`
                        : null
                        }
                    </div>
                </div>
            </div>
`;

export async function catalogPage(ctx) {
    
    const userData = getUserData()

    const albums = await getAllAlbums();
    ctx.render(catalogTemplate(albums, userData))

}

import { html } from "../../node_modules/lit-html/lit-html.js";

export const albumPreview = (album) => html`
        
            <li class="card">
                <img src="${album.imageUrl}" alt="travis" />
                <p>
                    <strong>Singer/Band: </strong><span class="singer">${album.singer}</span>
                </p>
                <p>
                    <strong>Album name: </strong><span class="album">${album.album}</span>
                </p>
                <p><strong>Sales:</strong><span class="sales">${album.sales}</span></p>
                <a class="details-btn" href="/details/${album._id}">Details</a>
            </li>
        `

import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteAlbum, getAlbum } from "../data/services.js";
import { getUserData } from "../util.js";

const detailsTemplate = (album, isOwner, onDelete) => html`
<section id="detailsPage">
    <div class="wrapper">
        <div class="albumCover">
            <img src="${album.imgUrl}">
        </div>
        <div class="albumInfo">
            <div class="albumText">
                <h1>Name: ${album.name}</h1>
                <h3>Artist: ${album.artist}</h3>
                <h4>Genre: ${album.genre}</h4>
                <h4>Price: $${album.price}</h4>
                <h4>Date: ${album.releaseDate}</h4>
                <p>${album.description}</p>
            </div>

            <!-- Only for registered user and creator of the album-->
            <div class="actionBtn">
                ${
                    isOwner
                    ? html `
                         <a href="/edit/${album._id}" class="edit">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>`
                    : null 
                }
               
            </div>
        </div>
    </div>
</section>`;

export async function detailsPage(ctx) {

    const albumId = ctx.params.id;
    const album = await getAlbum(albumId);
    const user = getUserData();
    const isOwner = user && (user._id === album._ownerId);


    ctx.render(detailsTemplate(album, isOwner, onDelete))
    async function onDelete() {
        const confirmed = confirm(`Are you sure you want to delete ${album.name}?`)
        if (confirmed) {
            await deleteAlbum(albumId);
            ctx.page.redirect('/catalog');
        }
    }
}


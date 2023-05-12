import { html } from "../../node_modules/lit-html/lit-html.js";
import { deleteAlbum, getAlbum, getLikes, addLike, userLikesAlbum } from "../data/services.js";
import { getUserData } from "../util.js";



const detailsTemplate = (album, isOwner, likes, userLikesThisAlbum, onDelete, likeAlbum) => html`
<section id="details">
    <div id="details-wrapper">
        <p id="details-title">Album Details</p>
        <div id="img-wrapper">
            <img src="${album.imageUrl}" alt="example1" />
        </div>
        <div id="info-wrapper">
            <p><strong>Band:</strong><span id="details-singer">${album.singer}</span></p>
            <p>
                <strong>Album name:</strong><span id="details-album">${album.album}</span>
            </p>
            <p><strong>Release date:</strong><span id="details-release">${album.release}</span></p>
            <p><strong>Label:</strong><span id="details-label">${album.label}</span></p>
            <p><strong>Sales:</strong><span id="details-sales">${album.sales}</span></p>
        </div>
        <div id="likes">Likes: <span id="likes-count">${likes}</span></div>

        <!--Edit and Delete are only for creator-->
        <div id="action-buttons">
        ${isOwner 
            ? html`
            <!-- <a href="" id="like-btn">Like</a> -->
            <a href="/edit/${album._id}" id="edit-btn">Edit</a>
            <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
            : (!userLikesThisAlbum 
                ? html`<a @click=${likeAlbum} href="javascript:void(0)" id="like-btn">Like</a>`
                : null)
        }</div>

        
    </div>
</section>`;

export async function detailsPage(ctx) {

    const albumId = ctx.params.id;
    const album = await getAlbum(albumId);
    const user = getUserData();
    const isOwner = user && (user._id === album._ownerId);
    const likes = await getLikes(albumId);
    const userLikesThisAlbum = user ? await userLikesAlbum(user._id, albumId) : 1;
    
    ctx.render(detailsTemplate(album, isOwner, likes, userLikesThisAlbum, onDelete, likeAlbum))
    async function onDelete() {
        const confirmed = confirm(`Are you sure you want to delete ${album.album}?`)
        if (confirmed) {
            await deleteAlbum(albumId);
            ctx.page.redirect('/');
        }
    }
    
    async function likeAlbum() {
        await addLike(albumId);
        const newLikes = await getLikes(albumId);
        document.getElementById('likes-count').textContent = newLikes;
        
        const likeButton = document.getElementById('like-btn');
        if (likeButton) {
            likeButton.remove();
        }
    }

    
}


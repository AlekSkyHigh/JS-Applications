import { html } from "../../node_modules/lit-html/lit-html.js";
import { editAlbum, getAlbum } from "../data/services.js";
import { createSubmitHandler, getUserData } from "../util.js";


const albumEditTemplate = (album, onEdit) => html`
<section id="edit">
    <div class="form">
        <h2>Edit Album</h2>
        <form class="edit-form" @submit=${onEdit}>
            <input type="text" name="singer" .value=${album.singer} id="album-singer" placeholder="Singer/Band" />
            <input type="text" name="album" .value=${album.album} id="album-album" placeholder="Album" />
            <input type="text" name="imageUrl" .value=${album.imageUrl} id="album-img" placeholder="Image url" />
            <input type="text" name="release" .value=${album.release} id="album-release" placeholder="Release date" />
            <input type="text" name="label" .value=${album.label} id="album-label" placeholder="Label" />
            <input type="text" name="sales" .value=${album.sales} id="album-sales" placeholder="Sales" />

            <button type="submit">post</button>
        </form>
    </div>
</section>
`


export async function editAlbumPage(ctx) {

    const albumId = ctx.params.id;
    const album = await getAlbum(albumId);
    const user = getUserData();
    ctx.render(albumEditTemplate(album, createSubmitHandler(onSubmit)));
    
    async function onSubmit(data) {
        if (Object.values(data).some(x => x === '')) {
            return alert('All fields are required');
        }

        await editAlbum(albumId, data);
        ctx.page.redirect(`/details/${albumId}`);
    }

}

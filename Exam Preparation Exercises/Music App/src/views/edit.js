import { html } from "../../node_modules/lit-html/lit-html.js";
import { editAlbum, getAlbum } from "../data/services.js";
import { createSubmitHandler, getUserData } from "../util.js";


const albumEditTemplate = (album, onEdit) => html`
<section class="editPage">
    <form @submit=${onEdit}>
        <fieldset>
            <legend>Edit Album</legend>

            <div class="container">
                <label for="name" class="vhide">Album name</label>
                <input id="name" name="name" .value=${album.name} class="name" type="text" value="In These Silent Days">

                <label for="imgUrl" class="vhide">Image Url</label>
                <input id="imgUrl" name="imgUrl" .value=${album.imgUrl} class="imgUrl" type="text" value="./img/BrandiCarlile.png">

                <label for="price" class="vhide">Price</label>
                <input id="price" name="price" .value=${album.price} class="price" type="text" value="12.80">

                <label for="releaseDate" class="vhide">Release date</label>
                <input id="releaseDate" name="releaseDate" .value=${album.releaseDate} class="releaseDate" type="text" value="October 1, 2021">

                <label for="artist" class="vhide">Artist</label>
                <input id="artist" name="artist" .value=${album.artist} class="artist" type="text" value="Brandi Carlile">

                <label for="genre" class="vhide">Genre</label>
                <input id="genre" name="genre" .value=${album.genre} class="genre" type="text" value="Low Country Sound Music">

                <label for="description" class="vhide">Description</label>
                <textarea name="description" .value=${album.description} class="description" rows="10" cols="10"></textarea>

                <button class="edit-album" type="submit">Edit Album</button>
            </div>
        </fieldset>
    </form>
</section>
`


export async function editAlbumPage(ctx) {

    const albumId = ctx.params.id;
    const album = await getAlbum(albumId);
    ctx.render(albumEditTemplate(album, createSubmitHandler(onSubmit)));

    async function onSubmit(data) {
        if (Object.values(data).some(x => x === '')) {
            return alert('All fields are required');
        }

        await editAlbum(albumId, data);
        ctx.page.redirect(`/details/${albumId}`);
    }

}

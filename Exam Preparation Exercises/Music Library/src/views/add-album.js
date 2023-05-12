import { html } from "../../node_modules/lit-html/lit-html.js";
import { createSubmitHandler } from '../util.js';
import { createAlbum } from "../data/services.js";


const albumCreateTemplate = (onCreate) => html`<section id="create">
        <div class="form">
          <h2>Add Album</h2>
          <form @submit=${onCreate} class="create-form">
            <input type="text" name="singer" id="album-singer" placeholder="Singer/Band" />
            <input type="text" name="album" id="album-album" placeholder="Album" />
            <input type="text" name="imageUrl" id="album-img" placeholder="Image url" />
            <input type="text" name="release" id="album-release" placeholder="Release date" />
            <input type="text" name="label" id="album-label" placeholder="Label" />
            <input type="text" name="sales" id="album-sales" placeholder="Sales" />

            <button type="submit">post</button>
          </form>
        </div>
      </section>`;


export async function albumCreatePage(ctx) {

    const onSubmit = async function (data) {
        if (Object.values(data).some(x => x === '')) {
            return alert('All fields are required!')
        }

        await createAlbum(data);
        ctx.page.redirect('/dashboard');
    }
    ctx.render(albumCreateTemplate(createSubmitHandler(onSubmit)));
}

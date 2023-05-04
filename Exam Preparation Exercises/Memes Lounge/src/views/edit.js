import { html } from '../../node_modules/lit-html/lit-html.js';
import { editMeme, getMeme } from '../data/services.js';
import { createSubmitHandler } from '../util.js';
import { notification } from './notification.js';


const editMemeTemplate = (meme, onEdit) => html`
<section id="edit-meme">
    <form @submit=${onEdit} id="edit-form">
        <h1>Edit Meme</h1>
        <div class="container">
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" .value=${meme.title} name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" .value=${meme.description} name="description">
            </textarea>
            <label for="imageUrl">Image Url</label>
            <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" .value=${meme.imageUrl} name="imageUrl">
            <input type="submit" class="registerbtn button" value="Edit Meme">
        </div>
    </form>
</section>
`



export async function editMemePage(ctx) {

    const memeId = ctx.params.id;
    const meme = await getMeme(memeId);
    ctx.render(editMemeTemplate(meme, createSubmitHandler(onSubmit)));

    async function onSubmit(data) {
        if (Object.values(data).some(x => x === '')) {
            return notification('All fields are required');
        }

        await editMeme(memeId, data);
        ctx.page.redirect(`/details/${memeId}`);
    }


}

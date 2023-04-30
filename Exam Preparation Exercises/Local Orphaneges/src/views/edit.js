import { html } from '../../node_modules/lit-html/lit-html.js'
import { editPost, getPost } from '../data/services.js'
import { createSubmitHandler } from '../util.js'


const editTemplate = (post, onEdit) => html`
<section id="edit-page" class="auth">
    <form @submit=${onEdit} id="edit">
        <h1 class="title">Edit Post</h1>

        <article class="input-group">
            <label for="title">Post Title</label>
            <input type="title" name="title" .value=${post.title} id="title" value="">
        </article>

        <article class="input-group">
            <label for="description">Description of the needs </label>
            <input type="text" name="description" .value=${post.description} id="description" value="">
        </article>

        <article class="input-group">
            <label for="imageUrl"> Needed materials image </label>
            <input type="text" name="imageUrl" .value=${post.imageUrl} id="imageUrl" value="">
        </article>

        <article class="input-group">
            <label for="address">Address of the orphanage</label>
            <input type="text" name="address" .value=${post.address} id="address" value="">
        </article>

        <article class="input-group">
            <label for="phone">Phone number of orphanage employee</label>
            <input type="text" name="phone" .value=${post.phone} id="phone" value="">
        </article>

        <input type="submit" class="btn submit" value="Edit Post">
    </form>
</section>`;


export async function editPage(ctx) {

    const postId = ctx.params.id;
    const post = await getPost(postId);
    ctx.render(editTemplate(post, createSubmitHandler(onSubmit)));

    async function onSubmit(data) {
        if (Object.values(data).some(x => x === '')) {
            return alert('All fields are required');
        }

        await editPost(postId, data);
        ctx.page.redirect(`/details/${postId}`);
    }

}




import { html } from '../../node_modules/lit-html/lit-html.js';
import { createSubmitHandler } from '../util.js';
import { createMeme } from '../data/services.js';
import { notification } from './notification.js';

const createMemeTemplate = (onCreate) => html`
<section id="create-meme">
    <form @submit=${onCreate} id="create-form">
        <div class="container">
            <h1>Create Meme</h1>
            <label for="title">Title</label>
            <input id="title" type="text" placeholder="Enter Title" name="title">
            <label for="description">Description</label>
            <textarea id="description" placeholder="Enter Description" name="description"></textarea>
            <label for="imageUrl">Meme Image</label>
            <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
            <input type="submit" class="registerbtn button" value="Create Meme">
        </div>
    </form>
</section>
`


export async function createMemePage(ctx) {

    const onSubmit = async function (data) {

        if (Object.values(data).some(x => x === '')) {
          return notification('All fields are required!');
        }
    
        await createMeme(data);
        ctx.page.redirect('/all-memes');
      }
      ctx.render(createMemeTemplate(createSubmitHandler(onSubmit)));


}

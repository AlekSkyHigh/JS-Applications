import { html } from '../../node_modules/lit-html/lit-html.js'
import { editFruit, getFruit } from '../data/services.js'
import { createSubmitHandler } from '../util.js'

const editTemplate = (fruit, onEdit) => html`
<section id="edit">
          <div class="form">
            <h2>Edit Fruit</h2>
            <form @submit=${onEdit} class="edit-form">
              <input
                type="text"
                name="name"
                .value=${fruit.name}
                id="name"
                placeholder="Fruit Name"
              />
              <input
                type="text"
                name="imageUrl"
                .value=${fruit.imageUrl}
                id="Fruit-image"
                placeholder="Fruit Image URL"
              />
              <textarea
                id="fruit-description"
                name="description"
                .value=${fruit.description}
                placeholder="Description"
                rows="10"
                cols="50"
              ></textarea>
              <textarea
                id="fruit-nutrition"
                name="nutrition"
                .value=${fruit.nutrition}
                placeholder="Nutrition"
                rows="10"
                cols="50"
              ></textarea>
              <button type="submit">post</button>
            </form>
          </div>
        </section> 
`

export async function editPage(ctx) {

  const fruitId = ctx.params.id;
  const fruit = await getFruit(fruitId);
  ctx.render(editTemplate(fruit, createSubmitHandler(onSubmit)));

  async function onSubmit(data) {
    if (Object.values(data).some(x => x === '')) {
      return alert('All fields are required');
    }

    await editFruit(fruitId, data);
    ctx.page.redirect(`/details/${fruitId}`);
  }

}




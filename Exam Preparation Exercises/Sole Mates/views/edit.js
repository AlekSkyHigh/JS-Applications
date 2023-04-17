import { html } from '../../node_modules/lit-html/lit-html.js'
import { editProduct, getProduct } from '../data/services.js'
import { createSubmitHandler, getUserData } from '../util.js'

const editTemplate = (product, onEdit) => html`
<section id="edit">
  <div class="form">
    <h2>Edit item</h2>
    <form @submit=${onEdit} class="edit-form">
      <input type="text" name="brand" .value=${product.brand} id="shoe-brand" placeholder="Brand" />
      <input type="text" name="model" .value=${product.model} id="shoe-model" placeholder="Model" />
      <input type="text" name="imageUrl" .value=${product.imageUrl} id="shoe-img" placeholder="Image url" />
      <input type="text" name="release" .value=${product.release} id="shoe-release" placeholder="Release date" />
      <input type="text" name="designer" .value=${product.designer} id="shoe-designer" placeholder="Designer" />
      <input type="text" name="value" .value=${product.value} id="shoe-value" placeholder="Value" />

      <button type="submit">post</button>
    </form>
  </div>
</section>
`

export async function editPage(ctx) {

  const productId = ctx.params.id;
  const product = await getProduct(productId);
  const user = getUserData();
  ctx.render(editTemplate(product, createSubmitHandler(onSubmit)));

  async function onSubmit(data) {
    if (Object.values(data).some(x => x === '')) {
      return alert('All fields are required');
    }

    await editProduct(productId, data);
    ctx.page.redirect(`/details/${productId}`);
  }

}

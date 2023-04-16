import { html } from "../../node_modules/lit-html/lit-html.js";
import { createProduct } from "../data/services.js";
import { createSubmitHandler } from "../util.js";

const addProductTemplate = (onCreate) => html`
<section id="create">
  <div class="form">
    <h2>Add item</h2>
    <form @submit=${onCreate} class="create-form">
      <input type="text" name="brand" id="shoe-brand" placeholder="Brand" />
      <input type="text" name="model" id="shoe-model" placeholder="Model" />
      <input type="text" name="imageUrl" id="shoe-img" placeholder="Image url" />
      <input type="text" name="release" id="shoe-release" placeholder="Release date" />
      <input type="text" name="designer" id="shoe-designer" placeholder="Designer" />
      <input type="text" name="value" id="shoe-value" placeholder="Value" />

      <button type="submit">post</button>
    </form>
  </div>
</section>`;

export async function addProductPage(ctx) {

  const onSubmit = async function (data) {

    if (Object.values(data).some(x => x === '')) {
      return alert('All fields are required!')
    }

    await createProduct(data);
    ctx.page.redirect('/dashboard');
  }
  ctx.render(addProductTemplate(createSubmitHandler(onSubmit)));

}

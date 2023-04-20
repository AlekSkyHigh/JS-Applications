import { html } from "../../node_modules/lit-html/lit-html.js";
import { createProduct } from "../data/services.js";
import { createSubmitHandler } from "../util.js";

const addProductTemplate = (onCreate) => html`
<section id="create">
  <div class="form">
    <h2>Add Product</h2>
    <form @submit=${onCreate} class="create-form">
      <input type="text" name="name" id="name" placeholder="Product Name" />
      <input type="text" name="imageUrl" id="product-image" placeholder="Product Image" />
      <input type="text" name="category" id="product-category" placeholder="Category" />
      <textarea id="product-description" name="description" placeholder="Description" rows="5" cols="50"></textarea>

      <input type="text" name="price" id="product-price" placeholder="Price" />

      <button type="submit">Add</button>
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

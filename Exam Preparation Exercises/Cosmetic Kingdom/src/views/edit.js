import { html } from '../../node_modules/lit-html/lit-html.js'
import { editProduct, getProduct } from '../data/services.js'
import { createSubmitHandler, getUserData } from '../util.js'


const editTemplate = (product, onEdit) => html`
<section id="edit">
  <div class="form">
    <h2>Edit Product</h2>
    <form @submit=${onEdit} class="edit-form">
      <input type="text" name="name" .value=${product.name} id="name" placeholder="Product Name" />
      <input type="text" name="imageUrl" .value=${product.imageUrl} id="product-image" placeholder="Product Image" />
      <input type="text" name="category" .value=${product.category} id="product-category" placeholder="Category" />
      <textarea id="product-description" .value=${product.description} name="description" placeholder="Description" rows="5" cols="50"></textarea>

      <input type="text" name="price" .value=${product.price} id="product-price" placeholder="Price" />
      <button type="submit">post</button>
    </form>
  </div>
</section>`


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


import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllProducts } from "../data/services.js";

const productsPageTemplate = (products) => html`
<h2>Products</h2>
<section id="dashboard">
    ${products.length == 0
    ? html `<h2>No products yet.</h2>`
    : html `${products.map(productPreview)}`}  
</section>`

const productPreview = (product) => html`
<div class="product">
    <img src="${product.imageUrl}" alt="example1" />
    <p class="title">${product.name}</p>
    <p><strong>Price:</strong><span class="price">${product.price}</span>$</p>
    <a class="details-btn" href="/details/${product._id}">Details</a>
  </div>
`

export async function productsPage(ctx) {

  const products = await getAllProducts();
  ctx.render(productsPageTemplate(products));
}


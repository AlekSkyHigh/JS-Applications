import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllProducts } from "../data/services.js";

const dashboardTemplate = (products) => html`
<section id="dashboard">
  <h2>Collectibles</h2>
  <ul class="card-wrapper">
      ${products.length == 0
        ? html `<h2>There are no items added yet.</h2>`
        : html `${products.map(shoeTemplate)}`}  
</section>`;

const shoeTemplate = (shoe) => html `
 <li class="card">
      <img src="${shoe.imageUrl}" alt="travis" />
      <p>
        <strong>Brand: </strong><span class="brand">${shoe.brand}</span>
      </p>
      <p>
        <strong>Model: </strong><span class="model">${shoe.model}</span>
      </p>
      <p><strong>Value:</strong><span class="value">${shoe.value}</span>$</p>
      <a class="details-btn" href="/details/${shoe._id}">Details</a>
    </li>`; 


export async function dashboardPage(ctx) {

  const shoes = await getAllProducts();
  ctx.render(dashboardTemplate(shoes));

};

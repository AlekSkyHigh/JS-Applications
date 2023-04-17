import { html } from "../../node_modules/lit-html/lit-html.js";
import { getProduct, deleteProduct } from "../data/services.js";
import { getUserData } from "../util.js";

const detailsTemplate = (product, isOwner, onDelete) => html `
<section id="details">
          <div id="details-wrapper">
            <p id="details-title">Shoe Details</p>
            <div id="img-wrapper">
              <img src="${product.imageUrl}" alt="example1" />
            </div>
            <div id="info-wrapper">
              <p>Brand: <span id="details-brand">${product.brand}</span></p>
              <p>
                Model: <span id="details-model">${product.model}</span>
              </p>
              <p>Release date: <span id="details-release">${product.release}</span></p>
              <p>Designer: <span id="details-designer">${product.designer}</span></p>
              <p>Value: <span id="details-value">${product.value}</span></p>
            </div>

            <!--Edit and Delete are only for creator-->
            <div id="action-buttons">
              ${isOwner
              ? html `
              <a href="/edit/${product._id}" id="edit-btn">Edit</a>
              <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
              : null}
            </div>
          </div>
        </section>`

export async function detailsPage(ctx) {

  const productId = ctx.params.id;
  const product = await getProduct(productId);
  const user = getUserData();
  const isOwner = user && (user._id === product._ownerId)
  
  async function onDelete() {
    const confirmed = confirm(`Are you sure you want to delete ${product.brand}?`)
    if (confirmed) {
      await deleteProduct(productId);
      ctx.page.redirect('/dashboard');
    }
  }

  ctx.render(detailsTemplate(product, isOwner, onDelete))

}

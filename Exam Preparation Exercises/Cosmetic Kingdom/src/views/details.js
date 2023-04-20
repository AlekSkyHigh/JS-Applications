import { html } from "../../node_modules/lit-html/lit-html.js";
import { getProduct, deleteProduct, totalBoughtCount, userBought, buy } from "../data/services.js";
import { getUserData } from "../util.js";


const detailsTemplate = (product, isOwner, onDelete, totalBoughts, boughtByUser, onBuy) => html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src="${product.imageUrl}" alt="example1" />
      <p id="details-title">${product.name}</p>
      <p id="details-category">
        Category: <span id="categories">${product.category}</span>
      </p>
      <p id="details-price">
        Price: <span id="price-number">${product.price}</span>$</p>
      <div id="info-wrapper">
        <div id="details-description">
          <h4>Bought: <span id="buys">${totalBoughts}</span> times.</h4>
          <span>${product.description}</span>
        </div>
      </div>
  
      <div id="action-buttons">
        ${isOwner
        ? html`
        <!--Edit and Delete are only for creator-->
        <a href="/edit/${product._id}" id="edit-btn">Edit</a>
        <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
        : (!boughtByUser
        ? html`<a @click=${onBuy} href="javascript:void(0)" id="buy-btn">Buy</a>`
        : null)
        }
      </div>
    </div>
  </section>
`

export async function detailsPage(ctx) {

  const productId = ctx.params.id;
  const product = await getProduct(productId);
  const user = getUserData();
  const isOwner = user && (user._id === product._ownerId)
  const totalBoughts = await totalBoughtCount(productId);
  const boughtByUser = user ? await userBought(user._id, productId) : 1;

  async function onDelete() {
    const confirmed = confirm(`Are you sure you want to delete ${product.name}?`)
    if (confirmed) {
      await deleteProduct(productId);
      ctx.page.redirect('/dashboard');
    }
  }

  async function onBuy() {
    await buy(productId);
    const updateBoughts = await totalBoughtCount(productId);
    document.getElementById('buys').textContent = updateBoughts;

    const buyButton = document.getElementById('buy-btn');
    if (buyButton) {
      buyButton.remove();
    }
  }

  ctx.render(detailsTemplate(product, isOwner, onDelete, totalBoughts, boughtByUser, onBuy))

}

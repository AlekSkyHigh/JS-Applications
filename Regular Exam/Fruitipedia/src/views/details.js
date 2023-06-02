import { html } from "../../node_modules/lit-html/lit-html.js";
import { getFruit, deleteFruit } from "../data/services.js";
import { getUserData } from "../util.js";

const detailsTemplate = (fruit, isOwner, onDelete) => html`
<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${fruit.imageUrl}" alt="example1" />
            <p id="details-title">${fruit.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p>${fruit.description}</p>
                    <p id="nutrition">Nutrition</p>
                    <p id = "details-nutrition">
                      ${fruit.nutrition}</p>
              </div>
               <!--Edit and Delete are only for creator-->
          <div id="action-buttons">
            ${isOwner
              ? html `
                <a href="/edit/${fruit._id}" id="edit-btn">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" id="delete-btn">Delete</a>`
              : null}
        
          </div>
            </div>
        </div>
      </section>
`

export async function detailsPage(ctx) {

  const fruitId = ctx.params.id;
  const fruit = await getFruit(fruitId);
  const user = getUserData();
  const isOwner = user && (user._id === fruit._ownerId)

  async function onDelete() {
    const confirmed = confirm(`Are you sure you want to delete ${fruit.name}?`)
    if (confirmed) {
      await deleteFruit(fruitId);
      ctx.page.redirect('/dashboard');
    }
  }

  ctx.render(detailsTemplate(fruit, isOwner, onDelete))

}


import { html } from '../../node_modules/lit-html/lit-html.js';
import { searchProducts } from '../data/services.js';
import { getUserData } from '../util.js';

const searchTemplate = (searchShoes, results, userData) => html`
<section id="search">
          <h2>Search by Brand</h2>

          <form class="search-wrapper cf" @submit=${searchShoes}>
            <input
              id="#search-input"
              type="text"
              name="search"
              placeholder="Search here..."
              required
            />
            <button type="submit">Search</button>
          </form>

          <h3>Results:</h3>

          <div id="search-container">
            <ul class="card-wrapper">${
                false === results ? null :
                (results.length === 0 
                ? html`<h2>There are no results found.</h2>`
                : html`${results.map(p => previewProduct(p, userData))}`
                )}
            </ul>
            
          </div>
        </section>`;

const previewProduct = (product, userData) => html`
    <li class="card">
        <img src="${product.imageUrl}" alt="travis" />
        <p>
          <strong>Brand: </strong><span class="brand">${product.brand}</span>
        </p>
        <p>
          <strong>Model: </strong
          ><span class="model">${product.designer}</span>
        </p>
        <p><strong>Value:</strong><span class="value">${product.value}</span>$</p>
        ${userData 
        ? html`<a class="details-btn" href="/details/${product._id}">Details</a>`
        : null}

    </li>`;

export async function searchPage(ctx) {
    const userData = getUserData();
    ctx.render(searchTemplate(searchShoes, false, userData));
    
    async function searchShoes(ev) {
        ev.preventDefault();

        const searchInput = document.getElementById('#search-input');
        
        if (searchInput.value === '') {
            return alert('Please type your search');
        }
        
        const results = await searchProducts(searchInput.value);        
        ctx.render(searchTemplate(searchShoes, results, userData));
    }
}

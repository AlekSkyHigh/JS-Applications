import { html } from '../../node_modules/lit-html/lit-html.js';
import { searchFruits } from '../data/services.js';
import { getUserData } from '../util.js';

const searchTemplate = (search, results, userData) => html`
<section id="search">

  <div class="form">
    <h2>Search</h2>
    <form class="search-form" @submit=${search}>
      <input
        type="text"
        name="search"
        id="search-input"
      />
      <button class="button-list">Search</button>
    </form>
  </div>

  <h4>Results:</h4>
    <div class="search-result">

    ${false === results ? null :
    (results.length === 0
      ? html `<p class="no-result">No result.</p>`
      : html `${results.map(previewFruit)}`
      )
    }

  </div>
</section> `;

const previewFruit = (fruit) => html`
<div class="fruit">
  <img src="${fruit.imageUrl}" alt="example1" />
  <h3 class="title">${fruit.name}</h3>
  <p class="description">${fruit.description}</p>
  <a class="details-btn" href="/details/${fruit._id}">More Info</a>
</div>`;

export async function searchPage(ctx) {
  const userData = getUserData();
  ctx.render(searchTemplate(search, false, userData));

  async function search(ev) {
    ev.preventDefault();

    const searchInput = document.getElementById('search-input');

    if (searchInput.value === '') {
      return alert('Please type your search');
    }

    const results = await searchFruits(searchInput.value);
    console.log(results);
    ctx.render(searchTemplate(search, results, userData));
  }
}


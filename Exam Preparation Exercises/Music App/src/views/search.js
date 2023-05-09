import { html } from '../../node_modules/lit-html/lit-html.js';
import { searchAlbums } from '../data/services.js';
import { getUserData } from '../util.js';

const searchTemplate = (search, results, userData) => html`
<section id="searchPage">
    <h1>Search by Name</h1>

    <div class="search" @submit=${search}>
        <input id="search-input" type="text" name="search" placeholder="Enter desired albums's name">
        <button @click=${search} class="button-list">Search</button>
    </div>

    <h2>Results:</h2>

    <!--Show after click Search button-->
    <div class="search-result">
        ${false === results ? null :
        (results.length == 0
        ? html`<p class="no-result">No result.</p>`
        : html`${results.map(x => previewAlbum(x, userData))}`)
    }
    </div>
</section>
`

const previewAlbum = (album, userData) => html`
<div class="card-box">
    <img src="${album.imgUrl}">
    <div>
        <div class="text-center">
            <p class="name">Name: ${album.name}</p>
            <p class="artist">Artist: ${album.artist}</p>
            <p class="genre">Genre: ${album.genre}</p>
            <p class="price">Price: $${album.price}</p>
            <p class="date">Release Date: ${album.releaseDate}</p>
        </div>
        <div class="btn-group">
            ${
                userData
                ? html `<a href="/details/${album._id}" id="details">Details</a>`
                : null
            }
        </div>
    </div>
</div>
`


export async function searchPage(ctx) {
    const userData = getUserData();
    ctx.render(searchTemplate(search, false, userData));

    async function search(ev) {
        ev.preventDefault();

        const searchInput = document.getElementById('search-input');

        if (searchInput.value === '') {
            return alert('Please type your search');
        }

        const results = await searchAlbums(searchInput.value);
        ctx.render(searchTemplate(search, results, userData));
    }
}

import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';
import { layoutTemplate } from './views/layout.js';
import { getUserData } from './util.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './data/auth.js';
import { catalogPage } from './views/catalog.js';
import { albumCreatePage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editAlbumPage } from './views/edit.js';
import { searchPage } from './views/search.js';

// TODO change render root depending on project HTML structure
const root = document.getElementById('box');

page(decorateContext);
page('index.html', '/');
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutAction);
page('/catalog', catalogPage);
page('/create', albumCreatePage);
page('/details/:id', detailsPage);
page('/edit/:id', editAlbumPage);
page('/search', searchPage);

page.start();

function decorateContext(ctx, next){
    ctx.render = renderView;

    next();
}

// TODO inject dependencies
function renderView(content){
    const userData = getUserData();
    render(layoutTemplate(userData, content), root);
}

function logoutAction(ctx) {
    logout();
    ctx.page.redirect('/');
}

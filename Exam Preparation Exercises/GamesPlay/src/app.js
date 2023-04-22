import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';
import { layoutTemplate } from './views/layout.js';
import { getUserData } from './util.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { gameCreatePage } from './views/create-game.js';
import { gameEditPage } from './views/edit-game.js';
import { cataloguePage } from './views/catalogue.js';
import { detailsPage } from './views/details.js' 
import { logout } from './data/auth.js';


// TODO change render root depending on project HTML structure
const root = document.getElementById('box');

page(decorateContext);
page('index.html', '/');
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutAction);
page('/create-game', gameCreatePage);
page('/edit-game/:id', gameEditPage);
page('/catalogue', cataloguePage);
page('/details/:id', detailsPage);

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

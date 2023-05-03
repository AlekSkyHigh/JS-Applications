import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';
import { layoutTemplate } from './views/layout.js';
import { getUserData } from './util.js';
import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './data/auth.js';
import { allMemesPage } from './views/all-memes.js';
import { createMemePage } from './views/create.js';
import { editMemePage } from './views/edit.js';
import { detailsPage } from './views/details.js';
import { profilePage } from './views/profile.js';

// TODO change render root depending on project HTML structure
const root = document.getElementById('container');

page(decorateContext);
page('index.html', '/');
page('/', homePage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutAction);
page('/all-memes', allMemesPage);
page('/create', createMemePage);
page('/edit/:id', editMemePage);
page('/details/:id', detailsPage);
page('/profile', profilePage);

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

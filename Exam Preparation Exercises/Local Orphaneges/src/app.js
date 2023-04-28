import page from '../node_modules/page/page.mjs';
import {render} from '../node_modules/lit-html/lit-html.js';
import { layoutTemplate } from './views/layout.js';
import { getUserData } from './util.js';
// import { homePage } from './views/home.js';
import { loginPage } from './views/login.js';
import { registerPage } from './views/register.js';
import { logout } from './data/auth.js';
import { postsPage } from './views/dashboard.js';
import { addPostPage } from './views/create.js';
import { detailsPage } from './views/details.js';
import { editPage } from './views/edit.js';
import { profilePage } from './views/my-posts.js';

// TODO change render root depending on project HTML structure
const root = document.getElementById('box');

page(decorateContext);
page('index.html', '/');
page('/', postsPage);
page('/login', loginPage);
page('/register', registerPage);
page('/logout', logoutAction);
page('/dashboard', postsPage);
page('/create', addPostPage);
page('/details/:id', detailsPage);
page('/edit/:id', editPage)
page('/my-posts', profilePage)

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
    ctx.page.redirect('/dashboard');
}

import page from '../node_modules/page/page.mjs';

const main = document.querySelector('main');

page('/', homePage);
page('/catalog', () => main.innerHTML = 'catalog page');
page('/about', () => main.innerHTML = 'about page');
page('*', () => main.innerHTML = '404 not found');


page.start();

function homePage() {
    main.innerHTML = 'home path';
}


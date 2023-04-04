import { html, render } from '../node_modules/lit-html/lit-html.js';

document.getElementById('btnLoadTowns').addEventListener('click', getTowns);

const listTemplate = (data) => html`
<ul>
    ${data.map(town => html`<li>${town}</li>`)}
</ul>
`;

function getTowns(event) {
    event.preventDefault();

    if (document.getElementById('towns').value !== '') {

        const root = document.getElementById('root');
        const towns = document.getElementById('towns').value.split(', ');

        // the following code shows how the logic can be done without templating:
        // const ul = document.createElement('ul');
        // towns.map(el => {
        //     let li = document.createElement('li');
        //     li.textContent = el;
        //     ul.appendChild(li);
        // })
        // root.appendChild(ul);

        const result = listTemplate(towns);
        render(result, root);

        document.getElementById('towns').value = '';
    }

}

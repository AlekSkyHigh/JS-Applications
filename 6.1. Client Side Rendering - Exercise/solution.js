import { html, render } from '../node_modules/lit-html/lit-html.js';

const url = 'http://localhost:3030/jsonstore/advanced/table';
const tableBody = document.querySelector('tbody');

async function getOptions() {
   const response = await fetch(url);
   const data = await response.json();
   return data;
}

getOptions();

const options = Object.values(await getOptions());

const rowTemplate = (data) => html`
   ${data.map(x => html`
      <tr>
         <td>${x.firstName} ${x.lastName}</td>
         <td>${x.email}</td>
         <td>${x.course}</td>
      </tr>`)}
`;

render(rowTemplate(options), tableBody);

function solve() {
   document.querySelector('#searchBtn').addEventListener('click', onClick);

   function onClick() {
      const tableDataElements = document.querySelectorAll(' tbody tr'); 
      let text = document.querySelector('#searchField').value.toLowerCase();

      for (const entry of tableDataElements) {
         entry.classList.remove('select');
         if (entry.textContent.toLowerCase().includes(text) && text !== '') {
            entry.className = 'select';
         }
      }
      text = '';
   }
}

solve()

import { html, render } from '../node_modules/lit-html/lit-html.js'
import { towns } from './towns.js'

const searchTemplate = (towns, match) => html`
<article>
   <div id="towns">
      <ul>
         ${towns.map(t => itemTemplate(t, match))}
      </ul>
   </div>
   <input type="text" id="searchText" />
   <button @click=${search}>Search</button>
   <div id="result">${count(towns, match)}</div>
</article>
`
const itemTemplate = (name, match) => html`
<li class=${(match && name.includes(match)) ? 'active' : '' }>${name}</li>
`


const main = document.body;
update();

function update(match = '') {
   const result = searchTemplate(towns, match);
   render(result, main);


}
function search() {

   const match = document.getElementById('searchText').value;
   update(match);

}

function count(towns, match) {
   const matches = towns.filter(t => match && t.includes(match)).length;
   return matches ? `${matches} matches found` : '0 matches found';
}

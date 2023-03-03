import {html, render} from '../node_modules/lit-html/lit-html.js'

const rootElement = document.getElementById('root');

const aboutTemplate = () => html`
<h1>About</h1>
<p>loremloremloremlorem loremloremloremlorem loremloremloremlorem loremloremloremlorem</p>
`

export const aboutView = (ctx) => {
   render(aboutTemplate(), rootElement);
}
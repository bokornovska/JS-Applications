import {html, render} from '../node_modules/lit-html/lit-html.js'

const homeTemplate = () => html`
<h1>Home</h1>
<p>loremloremloremlorem loremloremloremlorem loremloremloremlorem loremloremloremlorem</p>
`

const rootElement = document.getElementById('root');

export const homeView = (ctx) => {
    render(homeTemplate(), rootElement)
};


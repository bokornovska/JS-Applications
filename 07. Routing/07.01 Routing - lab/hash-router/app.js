const homeTemplate = () => `
<h1>Home</h1>
<p>loremloremloremlorem loremloremloremlorem loremloremloremlorem loremloremloremlorem</p>
`

const articlesTemplate = () => `
<h1>Articles</h1>
<p>loremloremloremlorem loremloremloremlorem loremloremloremlorem loremloremloremlorem</p>
<p>loremloremloremlorem loremloremloremlorem loremloremloremlorem loremloremloremlorem</p>
<p>loremloremloremlorem loremloremloremlorem loremloremloremlorem loremloremloremlorem</p>
`

const aboutTemplate = () => `
<h1>About</h1>
<p>loremloremloremlorem loremloremloremlorem loremloremloremlorem loremloremloremlorem</p>
`

const routes = {
    "#home": homeTemplate,
    "#articles": articlesTemplate,
    "#about": aboutTemplate
}

const root = document.getElementById('root');

window.addEventListener('hashchange', (e) => {
    console.log('changed to' + " " + location.hash);

    let template = routes[location.hash];
    root.innerHTML = template();
})
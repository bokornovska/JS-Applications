import {html, render} from '../node_modules/lit-html/lit-html.js'
const rootElement = document.getElementById('root')
const articleDetailTemplate = (article) => html`
<article>
    <h1>${article.title}</h1>
    
    <main>
        <p>${article.content}</p>
    </main>

    <footer>
        <p>Author: ${article.author}</p>
    </footer>
</article>
`

const fetchArticle = (articleId) => 
    fetch(`http://localhost:3030/jsonstore/articles/${articleId}`)
    .then((res) => res.json())

    export const articleDetailsView = (ctx) => {
        fetchArticle(ctx.params.articleId)
        .then(article => {
            render(articleDetailTemplate(article), rootElement)
        })
        
    }
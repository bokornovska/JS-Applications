import { html, render } from '../node_modules/lit-html/lit-html.js'
const rootElement = document.getElementById('root');

const articleTemplate = (article) => html`
    <article>
        <h3>${article.title}</h3>

        <footer>
            <p>Author: ${article.author}</p>
            <a href="/articles/${article.id || article._id}">Read more...</a>
        </footer>

    </article>
    `
const articlesTemplate = (articles) => html`
 <h1> Articles</h1>
${articles.map((x) => html `${articleTemplate(x)}`)}
`

const getArticles = () =>
    fetch('http://localhost:3030/jsonstore/articles')
        .then(res => res.json())
        .then(data => Object.values(data));

export const articlesView = (ctx) => {
    getArticles()
        .then(articles => {
            render(articlesTemplate(articles), rootElement)
        })

}
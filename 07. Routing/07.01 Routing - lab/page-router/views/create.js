import { html, render } from '../node_modules/lit-html/lit-html.js'
const rootElement = document.getElementById('root');

const createArticleHandler = (ctx, e) => {
    e.preventDefault();
    let formData = new FormData(e.currentTarget);

    let title = formData.get('title');
    let content = formData.get('content');
    let author = formData.get('author');

    fetch('http://localhost:3030/jsonstore/articles', {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ title, content, author })
    })
        .then(res => res.json())
        .then(article => {
            ctx.page.redirect(`/articles/${article._id}`)
        })
};

const createTemplate = (ctx) => html`
    <form @submit=${(e) => createArticleHandler(ctx, e)}>
        <div>
            <label for="title">Title</label>
            <input type="text" id="title" name="title" />
        </div>
        <div>
            <label for="content">Content</label>
            <textarea name="content" id="content" cols="30" rows="10"></textarea>
        </div>
        <div>
            <label for="author">Author</label>
            <input type="text" id="author" name="author" />
        </div>
        <div>
            <input type="submit" value="create" />
        </div>
    </form>
    `

export const createView = (ctx) => {

    render(createTemplate(ctx), rootElement)

}
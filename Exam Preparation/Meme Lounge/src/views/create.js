import {html} from '../../node_modules/lit-html/lit-html.js';
import { createMeme } from '../api/data.js';
import { createSubbmitHandler } from '../api/utils.js';

const createTemp = (onSubmit) => {
    return html`
   <section id="create-meme">
            <form @submit = ${onSubmit} id="create-form">
                <div class="container">
                    <h1>Create Meme</h1>
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description"></textarea>
                    <label for="imageUrl">Meme Image</label>
                    <input id="imageUrl" type="text" placeholder="Enter meme ImageUrl" name="imageUrl">
                    <input type="submit" class="registerbtn button" value="Create Meme">
                </div>
            </form>
        </section>
    `
};

export function createView(ctx) {
    ctx.render(createTemp(createSubbmitHandler(onSubmit)));

    async function onSubmit({title, description, imageUrl}){

        if(title == '' || description == '' || imageUrl == ''){
            return alert('All fields required!')
        }

        await createMeme({
            title, 
            description, 
            imageUrl, 
        });

        ctx.page.redirect('/catalog');
    }
}
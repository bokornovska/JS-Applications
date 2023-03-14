import {html} from '../../node_modules/lit-html/lit-html.js';
import { getById } from '../api/data.js';
import {createSubbmitHandler} from '../api/utils.js';
import { editMeme } from '../api/data.js';



const editTemp = (meme, onSubmit) => html`
<section id="edit-meme">
            <form @submit=${onSubmit} id="edit-form">
                <h1>Edit Meme</h1>
                <div class="container">
                    <label for="title">Title</label>
                    <input id="title" type="text" placeholder="Enter Title" name="title" .value="${meme.title}">
                    <label for="description">Description</label>
                    <textarea id="description" placeholder="Enter Description" name="description" .value="${meme.description}">
                          
                        </textarea>
                    <label for="imageUrl">Image Url</label>
                    <input id="imageUrl" type="text" placeholder="Enter Meme ImageUrl" name="imageUrl" .value="${meme.imageUrl}">
                    <input type="submit" class="registerbtn button" value="Edit Meme">
                </div>
            </form>
        </section>
`;

export async function editView (ctx) {

    const id = ctx.params.id;
    const meme = await getById(id);

    ctx.render(editTemp(meme, createSubbmitHandler(onSubmit)));

    async function onSubmit({
        title,
        description,
        imageUrl
      }){

        if(title == '' || description == '' || imageUrl == ''){
            return alert('All fields required!')
        }

        await editMeme(id, {
            title, 
            description, 
            imageUrl, 
        });

        ctx.page.redirect('/details/' + id);
    }
}
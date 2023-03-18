import {html} from '../../node_modules/lit-html/lit-html.js';
import { createShoe } from '../api/data.js';
import { createSubbmitHandler } from '../api/utils.js';

const createTemp = (onSubmit) => {
    return html`
  <section id="create">
          <div class="form">
            <h2>Add item</h2>
            <form @submit=${onSubmit} class="create-form">
              <input
                type="text"
                name="brand"
                id="shoe-brand"
                placeholder="Brand"
              />
              <input
                type="text"
                name="model"
                id="shoe-model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                id="shoe-img"
                placeholder="Image url"
              />
              <input
                type="text"
                name="release"
                id="shoe-release"
                placeholder="Release date"
              />
              <input
                type="text"
                name="designer"
                id="shoe-designer"
                placeholder="Designer"
              />
              <input
                type="text"
                name="value"
                id="shoe-value"
                placeholder="Value"
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
    `
};

export function createView(ctx) {
    ctx.render(createTemp(createSubbmitHandler(onSubmit)));

    async function onSubmit({
        brand,
        model, 
        imageUrl, 
        release, 
        designer, 
        value
      
      }){

        if(brand == '' || model == '' || imageUrl == '' || release == '' || designer == '' || value == ''){
            return alert('All fields required!')
        }

        await createShoe({
        brand,
        model, 
        imageUrl, 
        release, 
        designer, 
        value
        });

        
        ctx.page.redirect('/dashboard');
    }
}

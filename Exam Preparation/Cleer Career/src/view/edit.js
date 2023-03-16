import { html } from '../../node_modules/lit-html/lit-html.js';
import { editOffer, getById } from '../api/data.js';
import { createSubbmitHandler } from '../api/utils.js';




const editTemp = (offer, onSubmit) => {return html`
 <section id="edit">
          <div class="form">
            <h2>Edit Offer</h2>
            <form @sumbit=${onSubmit} class="edit-form">
              <input
                type="text"
                name="title"
                id="job-title"
                placeholder="Title"
                .value = ${offer.title}
              />
              <input
                type="text"
                name="imageUrl"
                id="job-logo"
                placeholder="Company logo url"
                .value = ${offer.imageUrl}
              />
              <input
                type="text"
                name="category"
                id="job-category"
                placeholder="Category"
                .value=${offer.category}
              />
              <textarea
                id="job-description"
                name="description"
                placeholder="Description"
                .value=${offer.description}
                rows="4"
                cols="50"
              ></textarea>
              <textarea
                id="job-requirements"
                name="requirements"
                placeholder="Requirements"
                .value = ${offer.requirements}
                rows="4"
                cols="50"
              ></textarea>
              <input
                type="text"
                name="salary"
                id="job-salary"
                placeholder="Salary"
                .value=${offer.salary}
              />

              <button type="submit">post</button>
            </form>
          </div>
        </section>
`};

export async function editView(ctx) {

    const id = ctx.params.id;
    const offer = await getById(id);

    ctx.render(editTemp(offer, createSubbmitHandler(onSubmit)));

    async function onSubmit({
        title,
        imageUrl,
        category,
        description,
        requirements,
        salary
      
    }) {

        if (title == '' || description == '' || imageUrl == '' || category == '' || requirements == '' || salary == '') {
            return alert('All fields required!')
        }


        await editOffer(id, {
            title,
            imageUrl,
            category,
            description,
            requirements,
            salary
        });

        ctx.page.redirect('/details/' + id);
    }
}
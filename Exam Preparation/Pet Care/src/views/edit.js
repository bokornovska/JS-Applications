import {html} from '../../node_modules/lit-html/lit-html.js';
import { getById } from '../api/data.js';
import {createSubbmitHandler} from '../api/utils.js';
import { editPet } from '../api/data.js';



const editTemp = (pet, onSubmit) => html`
<section id="editPage">
            <form @submit = ${onSubmit} class="editForm">
                <img src="./images/editpage-dog.jpg">
                <div>
                    <h2>Edit PetPal</h2>
                    <div class="name">
                        <label for="name">Name:</label>
                        <input name="name" id="name" type="text" .value=${pet.name}>
                    </div>
                    <div class="breed">
                        <label for="breed">Breed:</label>
                        <input name="breed" id="breed" type="text" .value=${pet.breed}>
                    </div>
                    <div class="Age">
                        <label for="age">Age:</label>
                        <input name="age" id="age" type="text" .value=${pet.age}>
                    </div>
                    <div class="weight">
                        <label for="weight">Weight:</label>
                        <input name="weight" id="weight" type="text" .value=${pet.weight}>
                    </div>
                    <div class="image">
                        <label for="image">Image:</label>
                        <input name="image" id="image" type="text" value="${pet.image}">
                    </div>
                    <button class="btn" type="submit">Edit Pet</button>
                </div>
            </form>
        </section>
`;

export async function editView (ctx) {

    const id = ctx.params.id;
    const pet = await getById(id);

    ctx.render(editTemp(pet, createSubbmitHandler(onSubmit)));

    async function onSubmit({name, breed, age, weight, image}){

        if(name == '' || breed == '' || age == '' || weight == '' || image == ''){
            return alert('All fields required!')
        }

        await editPet(id, {
            name, 
            breed, 
            age, 
            weight, 
            image
        });

        ctx.page.redirect('/details/' + id);
    }
}
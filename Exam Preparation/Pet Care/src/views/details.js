import { html } from '../../node_modules/lit-html/lit-html.js';
import { deleteById, getById } from '../api/data.js';
import { donate, getDonations, getOwnDonation } from '../api/donations.js';


const detailsTemp = (pet, donations, hasUser, canDonate, isOwner, onDelete, onDonate) => html`
<section id="detailsPage">
    <div class="details">
        <div class="animalPic">
            <img src=${pet.image}>
        </div>
        <div>
            <div class="animalInfo">
                <h1>Name: ${pet.name}</h1>
                <h3>Breed: ${pet.breed}</h3>
                <h4>Age: ${pet.age}</h4>
                <h4>Weight: ${pet.weight}</h4>
                <h4 class="donation">Donation: ${donations}$</h4>
            </div>

            ${petControls(pet, hasUser, canDonate, isOwner, onDelete, onDonate)}


        </div>
    </div>
</section>`

function petControls(pet, hasUser, canDonate, isOwner, onDelete, onDonate) {
    if (hasUser == false) {
        return '';
    }
    if (canDonate) {
        return html`
        <div class="actionBtn">
            <a @click = ${onDonate} href="javascript:void(0)" class="donate">Donate</a>
        
        </div>
        `
    }
    if(isOwner){
        return html`
        <div class="actionBtn">
                
                <a href="/edit/${pet._id}" class="edit">Edit</a>
                <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
        
        </div>
        `
    }
}
export async function detailsView(ctx) {

    const id = ctx.params.id;
    const hasUser = Boolean(ctx.user);
    
    const requests = [
        getById(id),
        getDonations(id)
    ];

    if(hasUser){
        requests.push(getOwnDonation(id, ctx.user._id))
    }
    
    const [pet, donations, hasDonation] = await Promise.all(requests);
    // console.log(pet)

    const isOwner = hasUser && ctx.user._id == pet._ownerId;

    const canDonate = !isOwner && hasDonation == 0;

    ctx.render(detailsTemp(pet, donations*100, hasUser, canDonate, isOwner, onDelete, onDonate));

    async function onDelete() {
        const choise = confirm('Are you sure you want to delete this pet?');
        // console.log(choise)

        if (choise == true) {
            await deleteById(id);
            ctx.page.redirect('/');
        }
    }

    async function onDonate(){
        await donate(id);
        ctx.page.redirect('/details/' + id)
    }
}
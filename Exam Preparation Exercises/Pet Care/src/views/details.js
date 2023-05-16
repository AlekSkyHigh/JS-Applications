import { html } from "../../node_modules/lit-html/lit-html.js";
import { deletePet, getPet, donate, getDonations, userDonated } from "../data/services.js";
import { getUserData } from "../util.js";

const detailsTemplate = (pet, isOwner, onDelete, totalDonations, donated, onDonate) => html`
<section id="detailsPage">
            <div class="details">
                <div class="animalPic">
                    <img src="${pet.image}">
                </div>
                <div>
                    <div class="animalInfo">
                        <h1>Name: ${pet.name}</h1>
                        <h3>Breed: ${pet.breed}</h3>
                        <h4>Age: ${pet.age}</h4>
                        <h4>Weight: ${pet.weight}</h4>
                        <h4 class="donation">Donation: ${totalDonations * 100}$</h4>
                    </div>

                    
                    <div class="actionBtn">
                    ${isOwner 
                        ? html`
                        <!-- Only for registered user and creator of the pets-->
                        <a href="/edit/${pet._id}" class="edit">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="remove">Delete</a>
                        
                        <!--(Bonus Part) Only for no creator and user-->
                        `
                        : (!donated
                            ? html `<a @click=${onDonate} href="javascript:void(0)" class="donate">Donate</a>`
                            : null
                            )
                    }
                    </div>

                </div>
            </div>
        </section>`

export async function detailsPage(ctx) {

    const petId = ctx.params.id;
    const pet = await getPet(petId);
    const user = getUserData();
    const isOwner = user && (user._id === pet._ownerId);
    const totalDonations = await getDonations(petId);
    const donated = user ? await userDonated(user._id, pet._id) : 1;

    async function onDelete() {
        const confirmed = confirm(`Are you sure you want to delete ${pet.name}?`)
        if (confirmed) {
            await deletePet(petId);
            ctx.page.redirect('/');
        }
    }

    ctx.render(detailsTemplate(pet, isOwner, onDelete, totalDonations, donated, onDonate))


    async function onDonate() {
        await donate(petId);
        const updatedDonationsCounter = await getDonations(petId);
        document.querySelector('.donation').textContent = `Donation: ${updatedDonationsCounter * 100}$`;
        
        const donateButton = document.querySelector('.donate');
        if (donateButton) {
            donateButton.remove();
        }
    }


}

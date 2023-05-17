import { html } from "../../node_modules/lit-html/lit-html.js";
import { editPet, getPet } from "../data/services.js";
import { createSubmitHandler, getUserData } from "../util.js";

const editPetPageTemplate = (pet, onEdit) => html`
<section id="editPage">
    <form @submit=${onEdit} class="editForm">
        <img src="${pet.image}">
        <div>
            <h2>Edit PetPal</h2>
            <div class="name">
                <label for="name">Name:</label>
                <input name="name" .value=${pet.name} id="name" type="text" value="Max">
            </div>
            <div class="breed">
                <label for="breed">Breed:</label>
                <input name="breed" .value=${pet.breed} id="breed" type="text" value="Shiba Inu">
            </div>
            <div class="Age">
                <label for="age">Age:</label>
                <input name="age" .value=${pet.age} id="age" type="text" value="2 years">
            </div>
            <div class="weight">
                <label for="weight">Weight:</label>
                <input name="weight" .value=${pet.weight} id="weight" type="text" value="5kg">
            </div>
            <div class="image">
                <label for="image">Image:</label>
                <input name="image" .value=${pet.image} id="image" type="text" value="./image/dog.jpeg">
            </div>
            <button class="btn" type="submit">Edit Pet</button>
        </div>
    </form>
</section>`;


export async function editPetPage(ctx) {

    const petId = ctx.params.id;
    const pet = await getPet(petId);
    const user = getUserData();
    ctx.render(editPetPageTemplate(pet, createSubmitHandler(onSubmit)));

    async function onSubmit(data) {
        if (Object.values(data).some(x => x === '')) {
            return alert('All fields are required');
        }

        await editPet(petId, data);
        ctx.page.redirect(`/details/${petId}`);
    }

}

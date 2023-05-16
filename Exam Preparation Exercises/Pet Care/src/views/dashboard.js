import { html } from "../../node_modules/lit-html/lit-html.js";
import { getAllPets } from "../data/services.js";
import { petPreview } from "./pet-preview.js";

const dashboardTemplate = (pets) => html `
    <section id="dashboard">
        <h2 class="dashboard-title">Services for every animal</h2>
            ${pets.length == 0 
            ? html `
                <div>
                    <p class="no-pets">No pets in dashboard</p>
                </div>`
            : html `
                <div class="animals-dashboard">
                    ${pets.map(petPreview)}
                </div>`
            }
    </section>`;

export async function dashboardPage(ctx){

    const pets = await getAllPets();
    ctx.render(dashboardTemplate(pets));
}

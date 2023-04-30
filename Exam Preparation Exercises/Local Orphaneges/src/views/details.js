import { html } from "../../node_modules/lit-html/lit-html.js";
import { getPost, deletePost, donate, totalDonationsCountForPost, userDonation } from "../data/services.js";
import { getUserData } from "../util.js";


const detailsTemplate = (post, isOwner, onDelete, donated, totalDonations, onDonate) => html`
<section id="details-page">
    <h1 class="title">Post Details</h1>

    <div id="container">
        <div id="details">
            <div class="image-wrapper">
                <img src="${post.imageUrl}" alt="Material Image" class="post-image">
            </div>
            <div class="info">
                <h2 class="title post-title">${post.title}</h2>
                <p class="post-description">Description: ${post.description}</p>
                <p class="post-address">Address: ${post.address}</p>
                <p class="post-number">Phone number: ${post.phone}</p>

                <p class="donate-Item">Donate Materials: ${totalDonations}</p>

                <!--Edit and Delete are only for creator-->
                <div class="btns">
                    ${isOwner
                    ? html `
                        <a href="/edit/${post._id}" class="edit-btn btn">Edit</a>
                        <a @click=${onDelete} href="javascript:void(0)" class="delete-btn btn">Delete</a>`
                    : (!donated
                        ? html `<a @click=${onDonate} href="javascript:void(0)" class="donate-btn btn">Donate</a>`
                        : null)    
                    }                   
                </div>

            </div>
        </div>
    </div>
</section>
`

export async function detailsPage(ctx) {

    const postId = ctx.params.id;
    const post = await getPost(postId);
    const user = getUserData();
    const isOwner = user && (user._id === post._ownerId)
    const totalDonations = await totalDonationsCountForPost(postId)
    const donated = user ? await userDonation(user._id, post._id) : 1;

    async function onDelete() {
        const confirmed = confirm(`Are you sure you want to delete ${post.title}?`)
        if (confirmed) {
            await deletePost(postId);
            ctx.page.redirect('/dashboard');
        }
    }

    ctx.render(detailsTemplate(post, isOwner, onDelete, donated, totalDonations, onDonate))


    async function onDonate() {
        await donate(postId);
        const updatedDonationsCounter = await totalDonationsCountForPost(postId);
        document.querySelector('.donate-Item').textContent = `Donate Materials: ${updatedDonationsCounter}`;
        
        const donateButton = document.querySelector('.donate-btn btn');
        if (donateButton) {
            donateButton.remove();
        }

        ctx.page.redirect(`/details/${postId}`) //remove the donate button

    }



}



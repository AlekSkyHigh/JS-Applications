import { html } from '../../node_modules/lit-html/lit-html.js';
import { getUserData } from '../util.js';
import { getUserPosts } from '../data/services.js';

const profilePageTemplate = (userData, userPosts) => html`
<section id="my-posts-page">
    <h1 class="title">My Posts</h1>

    ${userPosts.length == 0
        ? html`<h1 class="title no-posts-title">You have no posts yet!</h1>`
        : html`
    <div class="my-posts">
        ${userPosts.map(createdPostsPreview)}
    </div>`
    }

</section>
`;

const createdPostsPreview = (post) => html`
    <div class="post">
        <h2 class="post-title">${post.title}</h2>
        <img class="post-image" src="${post.imageUrl}" alt="Material Image">
        <div class="btn-wrapper">
            <a href="/details/${post._id}" class="details-btn btn">Details</a>
        </div>
    </div>`;

export async function profilePage(ctx) {

    const userData = getUserData();
    console.log(userData);

    if (userData && userData._id) {
        const userPosts = await getUserPosts(userData._id)
        ctx.render(profilePageTemplate(userData, userPosts))
    }
}


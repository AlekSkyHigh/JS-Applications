import { html } from '../../node_modules/lit-html/lit-html.js';
import { getGame, deleteGame, postComment, getComments } from '../data/services.js';
import { getUserData, createSubmitHandler } from '../util.js';

function viewComment(comment) { 
    return  html`
            <li class="comment">
            <p>${comment.comment}</p>
            </li>`;
}

const detailsTemplate = (game, isOwner, onDelete, user, addComment, comments) => {

    return html`<section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">

                <div class="game-header">
                    <img class="game-img" src="${game.imageUrl}" />
                    <h1>${game.title}</h1>
                    <span class="levels">MaxLevel: ${game.maxLevel}</span>
                    <p class="type">${game.category}</p>
                </div>

                <p class="text">
                    ${game.summary}
                </p>

                <!-- Bonus ( for Guests and Users ) -->
                <div class="details-comments">
                    <h2>Comments:</h2>
                    ${comments.length === 0
            ? html`<p class="no-comment">No comments.</p>`
            : html`<ul>${comments.map(viewComment)}</ul>`};
                    

                    
                    <!-- Display paragraph: If there are no games in the database -->
                    
                </div>
                ${ isOwner ?
            html`<!-- Edit/Delete buttons ( Only for creator of this game )  -->
                <div class="buttons">
                    <a href="/edit-game/${game._id}" class="button">Edit</a>
                    <a @click=${onDelete} class="button" href="javascript:void(0)">Delete</a>
                </div>` : null }
            </div>
            
            ${user ? html`
            <!-- Bonus -->
            <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
            <article class="create-comment">
                <label>Add new comment:</label>
                <form class="form" action="post" @submit=${addComment}>
                    <textarea name="comment" placeholder="Comment......"></textarea>
                    <input class="btn submit" type="submit" value="Add Comment">
                </form>
            </article>` : null}

        </section>`
};

export async function detailsPage(ctx) {    
    const gameId = ctx.params.id;
    const game = await getGame(gameId);
    const user = getUserData();
    const isOwner = user && (user._id === game._ownerId);
    
    async function allCommments(gameId) {
        const comments = await getComments(gameId);
        return comments;
    }
    const comments = await allCommments(game._id);
    ctx.render(detailsTemplate(game, isOwner, onDelete, user, createSubmitHandler(addComment), comments));

    async function onDelete() {
        const confirmed = confirm(`Are you sure you want to delete ${game.title}?`)
        if (confirmed) {
            await deleteGame(gameId);
            ctx.page.redirect('/');
        }
    }

    async function addComment(data) {
        if (!data.comment) {
            alert('Please write you comment!');
            return;
        }
        if (user) {
            await postComment({
                gameId: gameId,
                comment: data.comment
            });

            const textarea = document.querySelector('.create-comment textarea');
            textarea.value = '';
            ctx.page.redirect(`/details/${gameId}`);
        }

    }
}
;

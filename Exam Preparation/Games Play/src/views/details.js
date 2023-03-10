import {html} from '../../node_modules/lit-html/lit-html.js';
import * as gameServise from '../api/gamesService.js';
import { comentFormView } from './commentForm.js';
import { commentsView } from './comments.js';

const detailsTemp = (game, commentsSection, comentFormSection, onDelete) => {
    return html`
            <section id="game-details">
            <h1>Game Details</h1>
            <div class="info-section">

                <div class="game-header">
                    <img class="game-img" src=${game.imageUrl} />
                    <h1>${game.title}</h1>
                    <span class="levels">MaxLevel: ${game.maxLevel}</span>
                    <p class="type">${game.category}</p>
                </div>

                <p class="text">
                    ${game.summary}
                </p>

                <!-- Bonus ( for Guests and Users ) -->
               ${commentsSection}

                <!-- Edit/Delete buttons ( Only for creator of this game )  -->
                ${game.isOwner ? html`
                <div class="buttons">
                    <a href="/edit/${game._id}" class="button">Edit</a>
                    <a @click= ${onDelete} href="javascript:void(0)" class="button">Delete</a>
                </div>
                `: ''}
               
            </div>

            <!-- Bonus -->
            <!-- Add Comment ( Only for logged-in users, which is not creators of the current game ) -->
           ${comentFormSection}

        </section>
    `
}

export async function detailsView(ctx){
    const gameId = ctx.params.id;
    const [game, commentsSection] = await Promise.all([
        gameServise.getById(gameId),
        commentsView(gameId)
    ]);

    
    
    if(ctx.user){
        game.isOwner = ctx.user._id == game._ownerId;
    }
    
    const comentFormSection = comentFormView(ctx, game.isOwner)
    
    ctx.render(detailsTemp(game, commentsSection, comentFormSection, onDelete));

    async function onDelete(){
        const choise = confirm('Are you shure you want to delete this game?');

        if(choise){
            await gameServise.deleteById(gameId);
            ctx.page.redirect('/');
        }
    }
}
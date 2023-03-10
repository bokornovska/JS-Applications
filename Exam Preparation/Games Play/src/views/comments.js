import { html } from '../../node_modules/lit-html/lit-html.js';
import * as commentService from '../api/commentsService.js';
import { createSubmitHandler } from '../api/utils.js';

const commentsTemp = (comments) => {
    return html`
    <div class="details-comments">
        <h2>Comments:</h2>
       
            ${comments.length == 0 
            ? html`
             <p class="no-comment">No comments.</p>
            `
            : commentsList(comments)}      
       
    </div>
                `
}

const commentsList = (comments) => {
return html`
<ul>
${comments.map(commentCard)}
</ul>
`
}

const commentCard = (comment) => html`
<li class="comment">
    <p>Content: ${comment.comment}</p>
</li>
`
export async function commentsView(gameId) {
    const comments = await commentService.getByGameId(gameId);
    return commentsTemp(comments);
}


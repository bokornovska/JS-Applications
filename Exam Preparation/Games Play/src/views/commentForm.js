import { html, nothing } from '../../node_modules/lit-html/lit-html.js';
import * as commentService from '../api/commentsService.js';
import { createSubmitHandler } from '../api/utils.js';

const formTemp = (onSubmit) => {
    return html`
<article class="create-comment">
    <label>Add new comment:</label>
    <form @submit=${onSubmit}class="form">
        <textarea name="comment" placeholder="Comment......"></textarea>
        <input class="btn submit" type="submit" value="Add Comment">
    </form>
</article>
`};

export function comentFormView(ctx, isOwner) {
    if (ctx.user && !isOwner) {
        return formTemp(createSubmitHandler(ctx, onSubmit));
    } else {
        return nothing;
    }
}

async function onSubmit(ctx, data, event) {
    const gameId = ctx.params.id;
    await commentService.postComment({
        gameId,
        comment: data.comment
    });
    event.target.reset();
    ctx.page.redirect(`/details/${gameId}`)

}

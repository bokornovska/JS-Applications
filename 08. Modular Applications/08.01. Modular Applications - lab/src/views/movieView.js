import { html } from '../../node_modules/lit-html/lit-html.js';
import * as movieService from '../services/movieService.js';

const movieTemp = (movie) => html`
<div class="card mb-3" style="max-width: 540px;">
    <div class="row g-0">
        <div class="col-md-4">
            <img src="${movie.img}" class="img-fluid rounded-start" alt=${movie.title}>
        </div>
        <div class="col-md-8">
            <div class="card-body">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">${movie.description}</p>
                <p class="card-text"><small class="text-muted">Year: ${movie.year}</small></p>
            </div>
        </div>
    </div>
</div>
`;

export const movieView = (ctx) => {
    movieService.getOne(ctx.params.movieId)
        .then(movie => {
            ctx.render(movieTemp(movie))
        })
}
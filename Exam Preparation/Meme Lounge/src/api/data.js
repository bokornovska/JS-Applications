import { get, del, post, put} from './api.js'


export async function getAll() {

    return get('/data/memes?sortBy=_createdOn%20desc');
};

export async function getById (id){
    return get('/data/memes/' + id)
}

export async function deleteById(id){
    return del('/data/memes/' + id);
}

export async function createMeme(memeData){
    return post('/data/memes', memeData)
}
export async function editMeme(id, memeData){
    return put('/data/memes/' + id, memeData)
}

export async function getMyMemes(userId){
    return get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}
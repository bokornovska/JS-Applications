import { get, del, post, put} from './api.js'


export async function getAll() {

    return get('/data/albums?sortBy=_createdOn%20desc');
};

export async function getById (id){
    return get('/data/albums/' + id)
}

export async function deleteById(id){
    return del('/data/albums/' + id);
}

export async function createAlbum(data){
    return post('/data/albums', data)
}

export async function editAlbum(id, data){
    return put('/data/albums/' + id, data)
}

// export async function getMyMemes(userId){
//     return get(`/data/memes?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
// }
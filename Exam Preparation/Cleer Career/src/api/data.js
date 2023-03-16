import { get, del, post, put} from './api.js'


export async function getAll() {

    return get('/data/offers?sortBy=_createdOn%20desc');
};

export async function getById (id){
    return get('/data/offers/' + id);
}

export async function deleteById(id){
    return del('/data/offers/' + id);
}

export async function createOffer(offerData){
    return post('/data/offers', offerData)
}


export async function editOffer(id, offerData){
    return put('/data/offers/' + id, offerData)
}

// export async function getMyPosts(userId){
//     return get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
// }
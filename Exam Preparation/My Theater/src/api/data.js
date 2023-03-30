import { get, del, post, put} from './api.js'


export async function getAll() {

    return get('/data/theaters?sortBy=_createdOn%20desc&distinct=title');
};

export async function getById (id){
    return get('/data/theaters/' + id);
}

export async function deleteById(id){
    return del('/data/theaters/' + id);
}

export async function createTheater(postData){
    return post('/data/theaters', postData)
}


export async function editTheater(id, postData){
    return put('/data/theaters/' + id, postData)
}

export async function getMyPosts(userId){
    return get(`/data/theaters?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}
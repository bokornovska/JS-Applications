import { get, del, post, put} from './api.js'


export async function getAll() {

    return get('/data/shoes?sortBy=_createdOn%20desc');
};

export async function getById (id){
    return get('/data/shoes/' + id);
}

export async function deleteById(id){
    return del('/data/shoes/' + id);
}

// export async function createPost(postData){
//     return post('/data/posts', postData)
// }


// export async function editPost(id, postData){
//     return put('/data/posts/' + id, postData)
// }

// export async function getMyPosts(userId){
//     return get(`/data/posts?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
// }
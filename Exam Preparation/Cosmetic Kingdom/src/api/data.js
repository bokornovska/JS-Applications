import { get, del, post, put} from './api.js'


export async function getAll() {

    return get('/data/products?sortBy=_createdOn%20desc');
};

export async function getById (id){
    return get('/data/products/' + id)
}

export async function deleteById(id){
    return del('/data/products/' + id);
}

export async function addProduct(data){
    return post('/data/products', data)
}

export async function editProduct(id, data){
    return put('/data/products/' + id, data)
}


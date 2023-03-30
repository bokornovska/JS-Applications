import { get, del, post, put} from './api.js'


export async function getAll() {

    return get('/data/cars?sortBy=_createdOn%20desc');
};

export async function getById (id){
    return get(`/data/cars/${id}`);
}

export async function deleteById(id){
    return del('/data/cars/' + id);
}

export async function createListing(carData){
    return post('/data/cars', carData)
}


export async function editCar(id, carData){
    return put(`/data/cars/${id}`, carData)
}

export async function getMyListings(userId){
    return get(`/data/cars?where=_ownerId%3D%22${userId}%22&sortBy=_createdOn%20desc`)
}

export const search = (query) => {
    // let query = encodeURIComponent(`brand LIKE "${searchText}"`)  
    return get(`/data/cars?where=year%3D${query}`);
}

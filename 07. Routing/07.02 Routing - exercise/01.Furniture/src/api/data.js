import * as api from './api.js';

const endpoint = {
    "login": "users/login",
    "register": "users/register",
    "logout": "users/logout",
    "create": "data/catalog",
    "getAllItem": "data/catalog",
    "getItemById": "data/catalog/",
    "myItem": "data/catalog?where=_ownerId%3D%22"
}

export async function login(email, password) {
    const res = await api.post(endpoint.login, {email, password});
    sessionStorage.setItem("userData", JSON.stringify(res));
    return res;
}

export async function register(email, password){
    const res = await api.post(endpoint.register, {email, password});
    sessionStorage.setItem("userData", JSON.stringify(res));
    return res;
}


export async function logout(){
    const res = await api.get(endpoint.logout);
    sessionStorage.removeItem("userData");
    return res;
}

// Create Furniture (POST): http://localhost:3030/data/catalog
export async function create(data){
    const res = await api.post(endpoint.create, data);
    return res;
}

// All Furniture (GET): http://localhost:3030/data/catalog
export async function getAllItem(){
    const res = await api.get(endpoint.getAllItem);
    return res;
}

// Furniture Details (GET): http://localhost:3030/data/catalog/:id
export async function getItemById(id) {
    const res = await api.get(endpoint.getItemById + id);
    return res;
}

// Update Furniture (PUT): http://localhost:3030/data/catalog/:id

export async function updateById(id, data){
    const res = await api.put(endpoint.getItemById + id, data);
    return res;
}

// Delete Furniture (DELETE):  http://localhost:3030/data/catalog/:id

export async function delItem(id){
    const res = await api.del(endpoint.getItemById + id);
    return res;
}

// My Furniture (GET): http://localhost:3030/data/catalog?where=_ownerId%3D%22{userId}%22

export async function getMyItems(){
    // {userId}%22
    const userData = JSON.parse(sessionStorage.getItem("userData"));
    const userId = userData && userData._id;
    let id = `${userId}%22`
    const res = await api.get(endpoint.myItem + id);
    return res;
}

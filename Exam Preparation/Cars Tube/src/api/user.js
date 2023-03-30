import { post, get } from "./api.js";
import { setUserData, clearUserData } from "./utils.js";


export async function login(username, password){
    const result = await post('/users/login', {username, password});

    const userData = {
        id:result._id,
        username:result.username,        
        accessToken:result.accessToken

    }
    setUserData(userData);
    return result;
}

export async function register(username,password){

    const result = await post('/users/register', {username,password});
    
    const userData = {
        id:result._id,
        username:result.username,        
        accessToken:result.accessToken

    }
    setUserData(userData);
    return result;
}

export function logout(){
    get('/users/logout');
    clearUserData();
}
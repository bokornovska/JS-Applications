import * as api from './api.js';
import { clearUserData, setUserData } from './utils.js';


const endpoint = {
    login: '/users/login',
    register: '/users/register',
    logout: '/users/logout',


}
export async function login(email, password){
    const result = await api.post(endpoint.login, {email, password})
    setUserData(result);

    return result;
}

export async function register(email, password){
    const result = await api.post(endpoint.register, {email, password})
    setUserData(result);

    return result;
}

export async function logout(){
    api.get(endpoint.logout);
    clearUserData();
}
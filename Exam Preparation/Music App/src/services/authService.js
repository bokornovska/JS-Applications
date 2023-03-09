import * as request from './requester.js'

const baseUrl = 'http://localhost:3030/users';

const saveUser = (user) => {
    if (user.accessToken) {
        localStorage.setItem('userData', JSON.stringify(user))
    }
}

export const getUser = () => {
    let serializedUser = localStorage.getItem('userData');

    if (serializedUser) {
        let user = JSON.parse(serializedUser);
        return user;
    }
}

export const login = (email, password) => {
    return request.post(`${baseUrl}/login`, { email, password })
        .then(user => {
            saveUser(user);
            return user;
        });
}

export const register = (email, password) => {
    return request.post(`${baseUrl}/register`, { email, password })
        .then(user => {
            saveUser(user);
            return user;
        });
}
import * as api from "./apiService.js";
import { baseUrl } from "../app.js";

export const login = api.login;
export const logout = api.logout;
export const register = api.register;

export const isLogged = () => (localStorage.getItem("user") ? true : false);

export const getUser = () => JSON.parse(localStorage.getItem("user"));

//app specific requests below

export const createAlbum = (dto) => api.post(`${baseUrl}/data/albums`, dto);

export const getAllAlbums = () => api.get(`${baseUrl}/data/albums?sortBy=_createdOn%20desc`);

export const getOneById = (id) => api.get(`${baseUrl}/data/albums/${id}`);

export const delAlbum = (id) => api.del(`${baseUrl}/data/albums/${id}`);

export const updateOne = (id, dto) => api.put(`${baseUrl}/data/albums/${id}`, dto);

export const addLike = (id, dto) => api.post(`${baseUrl}/data/likes`, dto);

export const getTotalLikes = (id) => api.get(`${baseUrl}/data/likes?where=albumId%3D%22${id}%22&distinct=_ownerId&count`);

export const getmyLikes = (id, userId) =>
    api.get(`${baseUrl}/data/likes?where=albumId%3D%22${id}%22%20and%20_ownerId%3D%22${userId}%22&count`);

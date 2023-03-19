import { baseUrl } from "../app.js";

export async function login(userObj) {
  const reply = await post(`${baseUrl}/users/login`, {
    email: userObj.email,
    password: userObj.password,
  });
  localStorage.setItem("user", JSON.stringify(reply));
  return reply;
}
export async function register(userObj) {
  const reply = await post(`${baseUrl}/users/register`, {
    email: userObj.email,
    password: userObj.password,
  });
  localStorage.setItem("user", JSON.stringify(reply));
  return reply;
}
export async function logout() {
  const reply = await get(`${baseUrl}/users/logout`);
  localStorage.removeItem("user");
  return reply;
}

async function askServer(url, options) {
  try {
    const responce = await fetch(url, options);

    if (!responce.ok) {
      let msg = await responce.json();
      throw new Error(msg.message);
    }

    let data = await responce.json().catch((e) => responce);
    // console.log(data);
    return data;
  } catch (err) {
    throw err;
  }
}

function getOptions(method = "get", body) {
  const user = localStorage.getItem("user");
  const options = {
    method: method.toLowerCase(),
    headers: {},
  };

  if (user !== null) {
    options.headers["X-Authorization"] = JSON.parse(user).accessToken;
  }

  if (body) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  return options;
}

export const get = async (url) => await askServer(url, getOptions());

export const post = async (url, data) => await askServer(url, getOptions("post", data));

export const put = async (url, data) => await askServer(url, getOptions("put", data));

export const del = async (url) => await askServer(url, getOptions("delete"));

export const patch = async (url, data) => await askServer(url, getOptions("patch", data));

export const clearLocalStorage = () => localStorage.removeItem("user");

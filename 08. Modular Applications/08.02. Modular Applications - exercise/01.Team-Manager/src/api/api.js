const host = 'http://localhost:3030/'

async function request(url, options) {

    try {

        const res = await fetch(host + url, options);

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message);
        }

        try {

            if (res.status === 204) {
                return res;
            }

            const data = await res.json();
            return data
            
        } catch {
            alert(error.message);
            throw error
        }

    } catch (error) {
        alert(error.message);
        throw error
    }
}

function getOption(method, body) {
    const options = {
        method,
        headers: {}
    }

    const user = JSON.parse(sessionStorage.getItem('userData'));

    if (user) {
        const token = user.accessToken;
        options.headers["X-Authorization"] = token;
    }

    if (body) {
        options.headers["content-type"] = "application/json"
        options["body"] = JSON.stringify(body)
    }

    return options;
}

export async function get(url) {
    return await request(url, getOption("GET"))
}

export async function post(url, data) {
    return await request(url, getOption("POST", data))
}

export async function put(url, data) {
    return await request(url, getOption("PUT", data))
}

export async function del(url) {
    return await request(url, getOption("DELETE"))
}


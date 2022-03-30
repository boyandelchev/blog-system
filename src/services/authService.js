const baseUrl = 'http://localhost:3030/users';

export const register = async (email, password) => {
    let res = await fetch(`${baseUrl}/register`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    let jsonResult = await res.json();

    if (res.status === 409) {
        throw jsonResult.message;
    }

    return jsonResult;
};

export const login = async (email, password) => {
    let res = await fetch(`${baseUrl}/login`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    let jsonResult = await res.json();

    if (res.status === 403) {
        throw jsonResult.message;
    }

    return jsonResult;
};

export const logout = (token) => {
    return fetch(`${baseUrl}/logout`, {
        headers: {
            'X-Authorization': token,
        }
    });
};
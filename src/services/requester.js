const authRequest = (method, url, data) => {
    let response = null;

    if (method === 'GET') {
        response = fetch(url, {
            headers: {
                'X-Authorization': getToken()
            }
        });

        return response;
    } else if (method === 'POST') {
        response = fetch(url, {
            method,
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        return response.then(responseHandler);
    }
};

const request = (method, url, data) => {
    let response = null;

    if (method === 'GET') {
        response = fetch(url);
    } else if (method === 'POST' || method === 'PUT') {
        response = fetch(url, {
            method,
            headers: {
                'content-type': 'application/json',
                'X-Authorization': getToken()
            },
            body: JSON.stringify(data)
        });
    } else if (method === 'DELETE') {
        response = fetch(url, {
            method,
            headers: {
                'X-Authorization': getToken()
            }
        });
    }

    return response.then(responseHandler);
};

async function responseHandler(response) {
    let jsonData = await response.json();

    if (response.ok) {
        return jsonData;
    } else {
        throw jsonData;
    }
}

function getToken() {
    try {
        let userItem = localStorage.getItem('user');

        if (!userItem) {
            throw new Error('You must be authenticated!');
        }

        let user = JSON.parse(userItem);

        return user.accessToken;
    } catch (err) {
        console.log(err);
    }
}

export const authGet = authRequest.bind(null, 'GET');
export const authPost = authRequest.bind(null, 'POST');

export const get = request.bind(null, 'GET');
export const post = request.bind(null, 'POST');
export const put = request.bind(null, 'PUT');
export const deleteReq = request.bind(null, 'DELETE');
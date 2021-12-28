const baseUrl = 'http://localhost:3030/data';

export const getAll = async () => {
    let res = await fetch(`${baseUrl}/blogposts`);

    let jsonData = await res.json();

    if (res.ok) {
        return jsonData;
    } else {
        throw jsonData;
    }
};

export const getOne = (blogPostId) => {
    return fetch(`${baseUrl}/blogposts/${blogPostId}`)
        .then(res => res.json());
};

export const create = (blogPostData, token) => {
    return fetch(`${baseUrl}/blogposts`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify(blogPostData)
    })
        .then(res => res.json());
};

export const edit = (blogPostData, token) => {
    return fetch(`${baseUrl}/blogposts/${blogPostData._id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify(blogPostData)
    })
        .then(res => res.json());
};

export const deleteBlogPost = (blogPostId, token) => {
    return fetch(`${baseUrl}/blogposts/${blogPostId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token,
        }
    })
        .then(res => res.json());
};

export const getAllCategories = async () => {
    let res = await fetch(`${baseUrl}/categories`);

    let jsonData = await res.json();

    if (res.ok) {
        return jsonData;
    } else {
        throw jsonData;
    }
};
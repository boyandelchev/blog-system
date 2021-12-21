const baseUrl = 'http://localhost:3030/jsonstore';

export const getAll = () => {
    return fetch(`${baseUrl}/blogposts`)
        .then(res => res.json())
        .then(res => Object.values(res));
};

export const getOne = (blogPostId) => {
    return fetch(`${baseUrl}/blogposts/${blogPostId}`)
        .then(res => res.json());
};

export const create = (blogPostData) => {
    return fetch(`${baseUrl}/blogposts`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(blogPostData)
    })
        .then(res => res.json());
};

export const edit = (blogPostData) => {
    return fetch(`${baseUrl}/blogposts/${blogPostData._id}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json',
        },
        body: JSON.stringify(blogPostData)
    })
        .then(res => res.json());
};

export const getAllCategories = () => {
    return fetch(`${baseUrl}/categories`)
        .then(res => res.json())
        .then(res => Object.values(res));
};
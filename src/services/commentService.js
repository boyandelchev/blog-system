import { request } from './requester';

const baseURL = 'http://localhost:3030/data/comments';

export const getAll = (blogPostId) => request(`${baseURL}?where=blogPostId%3D%22${blogPostId}%22`);

export const create = (commentData, token) => {
    return fetch(baseURL, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify(commentData)
    })
        .then(res => res.json());
};
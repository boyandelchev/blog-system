import { request } from './requester';

const baseURL = 'http://localhost:3030/data/blog-posts';

export const getAll = () => request(baseURL);

export const getAllDescending = () => request(`${baseURL}?sortBy=_createdOn%20desc`);

export const getAllMine = (userId) => request(`${baseURL}?where=_ownerId%3D%22${userId}%22`);

export const getLastThree = () => request(`${baseURL}?select=_id%2Ctitle%2CimageURL%2C_createdOn%2CauthorName&sortBy=_createdOn%20desc&offset=0&pageSize=3`);

export const getOne = (blogPostId) => request(`${baseURL}/${blogPostId}`);

export const create = (blogPostData, token) => {
    return fetch(baseURL, {
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
    return fetch(`${baseURL}/${blogPostData._id}`, {
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
    return fetch(`${baseURL}/${blogPostId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token,
        }
    })
        .then(res => res.json());
};
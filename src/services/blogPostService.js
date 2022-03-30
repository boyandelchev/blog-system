import { request } from './requester';

const baseUrl = 'http://localhost:3030/data';

export const getAll = () => request(`${baseUrl}/blog-posts`);

export const getAllDescending = () => request(`${baseUrl}/blog-posts?sortBy=_createdOn%20desc`);

export const getAllMine = (userId) => request(`${baseUrl}/blog-posts/?where=_ownerId%3D%22${userId}%22`);

export const getLastThree = () => request(`${baseUrl}/blog-posts?select=_id%2Ctitle%2CimageUrl%2C_createdOn%2CauthorName&sortBy=_createdOn%20desc&offset=0&pageSize=3`);

export const getOne = (blogPostId) => request(`${baseUrl}/blog-posts/${blogPostId}`);

export const create = (blogPostData, token) => {
    return fetch(`${baseUrl}/blog-posts`, {
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
    return fetch(`${baseUrl}/blog-posts/${blogPostData._id}`, {
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
    return fetch(`${baseUrl}/blog-posts/${blogPostId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token,
        }
    })
        .then(res => res.json());
};

export const getAllCategories = () => request(`${baseUrl}/categories`);

export const getAllComments = (blogPostId) => request(`${baseUrl}/comments/?where=blogPostId%3D%22${blogPostId}%22`);

export const createComment = (commentData, token) => {
    return fetch(`${baseUrl}/comments`, {
        method: 'POST',
        headers: {
            'content-type': 'application/json',
            'X-Authorization': token,
        },
        body: JSON.stringify(commentData)
    })
        .then(res => res.json());
};
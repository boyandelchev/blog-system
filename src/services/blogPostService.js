import * as request from './requester';

const baseURL = 'http://localhost:3030/data/blog-posts';

export const getAll = () => request.get(baseURL);

export const getAllDescending = () => {
    const query = encodeURIComponent('_createdOn desc');

    return request.get(`${baseURL}?sortBy=${query}`);
};

export const getAllMine = (userId) => {
    const query = encodeURIComponent(`_ownerId="${userId}"`);

    return request.get(`${baseURL}?where=${query}`);
};

export const getLastThree = () => {
    const query = encodeURIComponent('_id,title,imageURL,_createdOn,authorName&sortBy=_createdOn desc&offset=0&pageSize=3');

    return request.get(`${baseURL}?select=${query}`);
};

export const getOne = (blogPostId) => request.get(`${baseURL}/${blogPostId}`);

export const create = (blogPostData) => request.post(baseURL, blogPostData);

export const edit = (blogPostData) => request.put(`${baseURL}/${blogPostData._id}`, blogPostData);

export const deleteBlogPost = (blogPostId) => request.deleteReq(`${baseURL}/${blogPostId}`);
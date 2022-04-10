import * as request from './requester';

const baseURL = 'http://localhost:3030/data/comments';

export const getAll = (blogPostId) => {
    const query = encodeURIComponent(`blogPostId="${blogPostId}"`);

    return request.get(`${baseURL}?where=${query}`);
};

export const create = (commentData) => request.post(baseURL, commentData);
import * as request from './requester';

const baseURL = 'http://localhost:3030/data/categories';

export const getAll = () => request.get(baseURL)
    .then(result => result[0].categories);
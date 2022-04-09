import { request } from './requester';

const baseURL = 'http://localhost:3030/data/categories';

export const getAll = () => request(baseURL);
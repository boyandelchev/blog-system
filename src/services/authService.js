import * as authRequest from './requester';

const baseURL = 'http://localhost:3030/users';

export const register = (email, password) => authRequest.authPost(`${baseURL}/register`, { email, password });

export const login = (email, password) => authRequest.authPost(`${baseURL}/login`, { email, password });

export const logout = () => authRequest.authGet(`${baseURL}/logout`);
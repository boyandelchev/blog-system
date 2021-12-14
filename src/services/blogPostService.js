const baseUrl = 'http://localhost:3030/jsonstore';

export const getAll = () => {
    return fetch(`${baseUrl}/blogposts`)
        .then(res => res.json());
};
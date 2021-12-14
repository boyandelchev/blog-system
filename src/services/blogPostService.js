const baseUrl = 'http://localhost:3030/jsonstore';

export const getAll = () => {
    return fetch(`${baseUrl}/blogposts`)
        .then(res => res.json());
};

export const getOne = (id) => {
    return fetch(`${baseUrl}/blogposts/${id}`)
        .then(res => res.json());
};
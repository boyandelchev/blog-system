const baseUrl = 'http://localhost:3030/jsonstore';

export const getAll = () => {
    return fetch(`${baseUrl}/blogposts`)
        .then(res => res.json());
};

export const getOne = (blogPostId) => {
    return fetch(`${baseUrl}/blogposts/${blogPostId}`)
        .then(res => res.json());
};
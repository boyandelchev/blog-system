const baseUrl = 'http://localhost:3030/data';

export const getAll = async () => {
    let res = await fetch(`${baseUrl}/blogposts`);

    let jsonData = await res.json();

    if (res.ok) {
        return jsonData;
    } else {
        throw jsonData;
    }
};

export const getAllDescending = async () => {
    let res = await fetch(`${baseUrl}/blogposts?sortBy=_createdOn%20desc`);

    let jsonData = await res.json();

    if (res.ok) {
        return jsonData;
    } else {
        throw jsonData;
    }
};

export const getAllMine = async (userId) => {
    let res = await fetch(`${baseUrl}/blogposts/?where=_ownerId%3D%22${userId}%22`);

    let jsonData = await res.json();

    if (res.ok) {
        return jsonData;
    } else {
        throw jsonData;
    }
};

export const getLastThree = async () => {
    let res = await fetch(`${baseUrl}/blogposts?select=_id%2Ctitle%2CimageUrl%2C_createdOn%2CauthorName&sortBy=_createdOn%20desc&offset=0&pageSize=3`);

    let jsonData = await res.json();

    if (res.ok) {
        return jsonData;
    } else {
        throw jsonData;
    }
};

export const getOne = (blogPostId) => {
    return fetch(`${baseUrl}/blogposts/${blogPostId}`)
        .then(res => res.json());
};

export const create = (blogPostData, token) => {
    return fetch(`${baseUrl}/blogposts`, {
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
    return fetch(`${baseUrl}/blogposts/${blogPostData._id}`, {
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
    return fetch(`${baseUrl}/blogposts/${blogPostId}`, {
        method: 'DELETE',
        headers: {
            'X-Authorization': token,
        }
    })
        .then(res => res.json());
};

export const getAllCategories = async () => {
    let res = await fetch(`${baseUrl}/categories`);

    let jsonData = await res.json();

    if (res.ok) {
        return jsonData;
    } else {
        throw jsonData;
    }
};

export const getAllComments = async (blogPostId) => {
    let res = await fetch(`${baseUrl}/comments/?where=blogPostId%3D%22${blogPostId}%22`);

    let jsonData = await res.json();

    if (res.ok) {
        return jsonData;
    } else {
        throw jsonData;
    }
};

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
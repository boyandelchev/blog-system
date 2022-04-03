import { useState, useEffect } from 'react';

import * as blogPostService from '../services/blogPostService';

const useBlogPostState = (blogPostId, setErrors) => {
    const [blogPost, setBlogPost] = useState({});

    useEffect(() => {
        blogPostService.getOne(blogPostId)
            .then(blogPostResult => {
                setBlogPost(blogPostResult);
            })
            .catch(err => {
                console.log(err.message);
                setErrors(state => ({ ...state, generalError: err.message }));
            });
    }, [blogPostId]);

    return [blogPost, setBlogPost];
};

export default useBlogPostState;
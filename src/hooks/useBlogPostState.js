import { useState, useEffect } from 'react';

import * as blogPostService from '../services/blogPostService';

const useBlogPostState = (blogPostId) => {
    const [blogPost, setBlogPost] = useState({});
    const [blogPostError, setBlogPostError] = useState('');

    useEffect(() => {
        blogPostService.getOne(blogPostId)
            .then(blogPostData => {
                setBlogPost(blogPostData);
            })
            .catch(err => {
                console.log(err.message);
                setBlogPostError(err.message);
            });
    }, [blogPostId]);

    return {
        blogPost,
        setBlogPost,
        blogPostError,
        setBlogPostError,
    };
};

export default useBlogPostState;
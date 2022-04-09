import { useState, useCallback } from 'react';

import { BLOG_POST } from '../constants/constants';

const regexImageURL = new RegExp(BLOG_POST.imageURLRegex);

const useBlogPostChangeHandler = () => {
    const [errors, setErrors] = useState({ generalError: '', title: '', content: '', imageURL: '' });

    const changeHandler = useCallback((e) => {
        const { name, value } = e.target;

        if (name === BLOG_POST.titleName) {
            if (value.length < BLOG_POST.titleMinLength || value.length > BLOG_POST.titleMaxLength) {
                setErrors(state => ({ ...state, title: BLOG_POST.titleError }));
            } else {
                setErrors(state => ({ ...state, title: '' }));
            }
        } else if (name === BLOG_POST.contentName) {
            if (value.length < BLOG_POST.contentMinLength || value.length > BLOG_POST.contentMaxLength) {
                setErrors(state => ({ ...state, content: BLOG_POST.contentError }));
            } else {
                setErrors(state => ({ ...state, content: '' }));
            }
        } else if (name === BLOG_POST.imageURLName) {
            if (!regexImageURL.test(value)) {
                setErrors(state => ({ ...state, imageURL: BLOG_POST.imageURLError }));
            } else {
                setErrors(state => ({ ...state, imageURL: '' }));
            }
        }

        setErrors(state => ({ ...state, generalError: '' }));
    }, []);

    return { errors, setErrors, changeHandler };
};

export default useBlogPostChangeHandler;
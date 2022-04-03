import { useState, useEffect } from 'react';

import * as blogPostService from '../services/blogPostService';

const useCategoriesState = (setErrors) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        blogPostService.getAllCategories()
            .then(categoriesResult => {
                let categoriesData = categoriesResult[0].categories;

                setCategories(categoriesData);
            })
            .catch(err => {
                console.log(err.message + ' (categories)');
                setErrors(state => ({ ...state, generalError: err.message + ' (categories)' }));
            });
    }, []);

    return [categories, setCategories];
};

export default useCategoriesState;
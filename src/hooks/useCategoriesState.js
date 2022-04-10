import { useState, useEffect } from 'react';

import * as categoryService from '../services/categoryService';

const useCategoriesState = () => {
    const [categories, setCategories] = useState([]);
    const [categoriesError, setCategoriesError] = useState('');

    useEffect(() => {
        categoryService.getAll()
            .then(categoriesData => {
                setCategories(categoriesData);
            })
            .catch(err => {
                console.log(err.message + ' (categories)');
                setCategoriesError(err.message + ' (categories)');
            });
    }, []);

    return {
        categories,
        setCategories,
        categoriesError,
        setCategoriesError,
    };
};

export default useCategoriesState;
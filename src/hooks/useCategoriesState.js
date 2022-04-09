import { useState, useEffect } from 'react';

import * as categoryService from '../services/categoryService';

const useCategoriesState = () => {
    const [categories, setCategories] = useState([]);
    const [categoriesError, setCategoriesError] = useState('');

    useEffect(() => {
        categoryService.getAll()
            .then(categoriesResult => {
                let categoriesData = categoriesResult[0].categories;

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
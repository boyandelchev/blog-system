import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as blogPostService from '../../services/blogPostService';
import { useAuthContext } from '../../contexts/AuthContext';
import useAuthorName from '../../hooks/useAuthorName';
import useCategoriesState from '../../hooks/useCategoriesState';
import useBlogPostChangeHandler from '../../hooks/useBlogPostChangeHandler';
import useValidateForm from '../../hooks/useValidateForm';
import useDebounce from '../../hooks/useDebounce';
import { EMPTY_FORM_ERROR, TITLE_NAME, CONTENT_NAME, IMAGE_URL_NAME, CATEGORIES_NAME } from '../../constants/constants';

import './BlogPostCreate.css';

const BlogPostCreate = () => {
    const navigate = useNavigate();
    const { user } = useAuthContext();
    const authorName = useAuthorName(user.email);
    const [errors, setErrors] = useState({ generalError: '', title: '', content: '', imageUrl: '' });
    const [categories, setCategories] = useCategoriesState(setErrors);
    const changeHandler = useBlogPostChangeHandler(setErrors);
    const validateForm = useValidateForm();
    const debounce = useDebounce();
    const [notification, setNotification] = useState({ message: 'You have successfully created a blog post.', timeOut: 3000 });

    const blogPostCreateHandler = (e) => {
        e.preventDefault();

        if (!validateForm(errors)) {
            return;
        }

        let formData = new FormData(e.currentTarget);

        let title = formData.get(TITLE_NAME);
        let content = formData.get(CONTENT_NAME);
        let imageUrl = formData.get(IMAGE_URL_NAME);
        let categories = formData.getAll(CATEGORIES_NAME);

        if (title === '' || content === '' || imageUrl === '') {
            setErrors(state => ({ ...state, generalError: EMPTY_FORM_ERROR }));
            return;
        }

        blogPostService.create({
            title,
            content,
            imageUrl,
            categories,
            authorName,
        }, user.accessToken)
            .then(() => {
                navigate('/', { state: notification });
            })
            .catch(err => {
                console.log(err.message);
                setErrors(state => ({ ...state, generalError: err.message }));
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6">
                    <h2 className="heading-margin text-center">Create a Post</h2>
                    <p className="error-blog-post-create-message">{errors.generalError}</p>
                    <form onSubmit={blogPostCreateHandler} method="POST">
                        <div className="mb-3">
                            <label htmlFor="blog-post-create-title" className="form-label">Title</label>
                            <input type="text" name="blog-post-create-title" className="form-control" id="blog-post-create-title" onChange={debounce(changeHandler)} placeholder="title" />
                            <p className="error-blog-post-create-message">{errors.title}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="blog-post-create-content" className="form-label">Content</label>
                            <textarea name="blog-post-create-content" className="form-control" id="blog-post-create-content" rows="10" onChange={debounce(changeHandler)} placeholder="content"></textarea>
                            <p className="error-blog-post-create-message">{errors.content}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="blog-post-create-image-url" className="form-label">Image URL</label>
                            <input type="text" name="blog-post-create-image-url" className="form-control" id="blog-post-create-image-url" onChange={debounce(changeHandler)} placeholder="image URL" />
                            <p className="error-blog-post-create-message">{errors.imageUrl}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="blog-post-create-categories" className="form-label">Select categories</label>
                            <select multiple className="form-control" id="blog-post-create-categories" name="blog-post-create-categories">
                                {categories.length > 0
                                    ? categories.map(x => <option key={x} value={x}>{x}</option>)
                                    : ''
                                }
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Create</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BlogPostCreate;
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import * as blogPostService from '../../services/blogPostService';
import { useAuthContext } from '../../contexts/AuthContext';
import useAuthorName from '../../hooks/useAuthorName';
import useBlogPostState from '../../hooks/useBlogPostState';
import useCategoriesState from '../../hooks/useCategoriesState';
import useBlogPostChangeHandler from '../../hooks/useBlogPostChangeHandler';
import useValidateForm from '../../hooks/useValidateForm';
import useDebounce from '../../hooks/useDebounce';
import { EMPTY_FORM_ERROR, TITLE_NAME, CONTENT_NAME, IMAGE_URL_NAME, CATEGORIES_NAME } from '../../constants/constants';

import './BlogPostEdit.css';

const BlogPostEdit = () => {
    const navigate = useNavigate();
    const { blogPostId } = useParams();
    const { user } = useAuthContext();
    const authorName = useAuthorName(user.email);
    const [errors, setErrors] = useState({ generalError: '', title: '', content: '', imageUrl: '' });
    const [blogPost, setBlogPost] = useBlogPostState(blogPostId, setErrors);
    const [categories, setCategories] = useCategoriesState(setErrors);
    const changeHandler = useBlogPostChangeHandler(setErrors);
    const validateForm = useValidateForm();
    const debounce = useDebounce();
    const [notification, setNotification] = useState({ message: 'You have successfully edited this blog post.', timeOut: 3000 });

    const categoriesChangeHandler = (e) => {
        const selectedCategories = [...e.target.options]
            .filter(option => option.selected)
            .map(x => x.value);

        setBlogPost({ ...blogPost, categories: selectedCategories });
    };

    const blogPostEditHandler = (e) => {
        e.preventDefault();

        if (!validateForm(errors)) {
            return;
        }

        let formData = new FormData(e.currentTarget);

        let _id = blogPostId;
        let title = formData.get(TITLE_NAME);
        let content = formData.get(CONTENT_NAME);
        let imageUrl = formData.get(IMAGE_URL_NAME);
        let categories = formData.getAll(CATEGORIES_NAME);

        if (title === '' || content === '' || imageUrl === '') {
            setErrors(state => ({ ...state, generalError: EMPTY_FORM_ERROR }));
            return;
        }

        blogPostService.edit({
            _id,
            title,
            content,
            imageUrl,
            categories,
            authorName,
        }, user.accessToken)
            .then(() => {
                navigate(`/blog-post-details/${blogPostId}`, { state: notification });
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
                    <h2 className="heading-margin text-center">Edit this Post</h2>
                    <p className="error-blog-post-edit-message">{errors.generalError}</p>
                    <form onSubmit={blogPostEditHandler} method="POST">
                        <div className="mb-3">
                            <label htmlFor="blog-post-create-title" className="form-label">Title</label>
                            <input type="text" name="blog-post-create-title" className="form-control" id="blog-post-create-title" defaultValue={blogPost.title} onChange={debounce(changeHandler)} placeholder="title" />
                            <p className="error-blog-post-edit-message">{errors.title}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="blog-post-create-content" className="form-label">Content</label>
                            <textarea name="blog-post-create-content" className="form-control" id="blog-post-create-content" rows="10" defaultValue={blogPost.content} onChange={debounce(changeHandler)} placeholder="content"></textarea>
                            <p className="error-blog-post-edit-message">{errors.content}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="blog-post-create-image-url" className="form-label">Image URL</label>
                            <input type="text" name="blog-post-create-image-url" className="form-control" id="blog-post-create-image-url" defaultValue={blogPost.imageUrl} onChange={debounce(changeHandler)} placeholder="image URL" />
                            <p className="error-blog-post-edit-message">{errors.imageUrl}</p>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="blog-post-create-categories" className="form-label">Select categories</label>
                            <select multiple className="form-control" id="blog-post-create-categories" name="blog-post-create-categories" value={blogPost.categories} onChange={categoriesChangeHandler}>
                                {categories.length > 0
                                    ? categories.map(x => <option key={x} value={x}>{x}</option>)
                                    : ''
                                }
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary">Edit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BlogPostEdit;
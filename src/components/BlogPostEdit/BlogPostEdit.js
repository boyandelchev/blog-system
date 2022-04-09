import { useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import * as blogPostService from '../../services/blogPostService';
import { AuthContext } from '../../contexts/AuthContext';
import getAuthorNameFromUserEmail from '../../utils/getAuthorNameFromUserEmail';
import useBlogPostState from '../../hooks/useBlogPostState';
import useCategoriesState from '../../hooks/useCategoriesState';
import useBlogPostChangeHandler from '../../hooks/useBlogPostChangeHandler';
import validateForm from '../../utils/validateForm';
import debounce from '../../utils/debounce';
import { EMPTY_FORM_ERROR, BLOG_POST } from '../../constants/constants';

import './BlogPostEdit.css';

const BlogPostEdit = () => {
    const navigate = useNavigate();
    const { blogPostId } = useParams();
    const { user } = useContext(AuthContext);
    const authorName = getAuthorNameFromUserEmail(user.email);
    const { blogPost, setBlogPost, blogPostError } = useBlogPostState(blogPostId);
    const { categories, categoriesError } = useCategoriesState();
    const { errors, setErrors, changeHandler } = useBlogPostChangeHandler();
    const [notification] = useState({ message: 'You have successfully edited this blog post.', timeOut: 3000 });

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

        let title = formData.get(BLOG_POST.titleName);
        let content = formData.get(BLOG_POST.contentName);
        let imageURL = formData.get(BLOG_POST.imageURLName);
        let categories = formData.getAll(BLOG_POST.categoriesName);

        if (title === '' || content === '' || imageURL === '') {
            setErrors(state => ({ ...state, generalError: EMPTY_FORM_ERROR }));
            return;
        }

        blogPostService.edit({
            _id: blogPostId,
            title,
            content,
            imageURL,
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
                    <p className="error-blog-post-edit-message">{errors.generalError || blogPostError || categoriesError}</p>
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
                            <input type="text" name="blog-post-create-image-url" className="form-control" id="blog-post-create-image-url" defaultValue={blogPost.imageURL} onChange={debounce(changeHandler)} placeholder="image URL" />
                            <p className="error-blog-post-edit-message">{errors.imageURL}</p>
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
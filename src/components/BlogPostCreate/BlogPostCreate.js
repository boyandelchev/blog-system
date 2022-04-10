import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import * as blogPostService from '../../services/blogPostService';
import { AuthContext } from '../../contexts/AuthContext';
import { NotificationContext } from '../../contexts/NotificationContext';
import getAuthorNameFromUserEmail from '../../utils/getAuthorNameFromUserEmail';
import useCategoriesState from '../../hooks/useCategoriesState';
import useBlogPostChangeHandler from '../../hooks/useBlogPostChangeHandler';
import validateForm from '../../utils/validateForm';
import debounce from '../../utils/debounce';
import { EMPTY_FORM_ERROR, BLOG_POST } from '../../constants/constants';

import './BlogPostCreate.css';

const BlogPostCreate = () => {
    const notificationMessage = 'You have successfully created a blog post.';
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const { showNotificationSuccess } = useContext(NotificationContext);
    const authorName = getAuthorNameFromUserEmail(user.email);
    const { categories, categoriesError } = useCategoriesState();
    const { errors, setErrors, changeHandler } = useBlogPostChangeHandler();

    const blogPostCreateHandler = (e) => {
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

        blogPostService.create({
            title,
            content,
            imageURL,
            categories,
            authorName,
        })
            .then(() => {
                showNotificationSuccess(notificationMessage);
                navigate('/');
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
                    <p className="error-blog-post-create-message">{errors.generalError || categoriesError}</p>
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
                            <p className="error-blog-post-create-message">{errors.imageURL}</p>
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
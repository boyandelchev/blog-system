import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import * as blogPostService from '../../services/blogPostService';
import { useAuthContext } from '../../contexts/AuthContext';

import './BlogPostDelete.css';
import ConfirmDialog from '../Common/ConfirmDialog';

const BlogPostDelete = () => {
    const navigate = useNavigate();
    const { blogPostId } = useParams();
    const { user } = useAuthContext();
    const [categories, setCategories] = useState([]);
    const [blogPost, setBlogPost] = useState({});
    const [error, setError] = useState('');
    const [notification, setNotification] = useState({ message: 'You have successfully deleted a blog post.', timeOut: 3000 });
    const [showDeleteDialog, setShowDeleteDialog] = useState(false);

    useEffect(() => {
        blogPostService.getAllCategories()
            .then(categoriesResult => {
                let categoriesData = categoriesResult[0].categories;

                setCategories(categoriesData);
            })
            .catch(err => {
                console.log(err.message + ' (categories)');
                setError(err.message + ' (categories)');
            });

        blogPostService.getOne(blogPostId)
            .then(blogPostResult => {
                setBlogPost(blogPostResult);
            })
            .catch(err => {
                console.log(err.message);
                setError(err.message);
            });
    }, [blogPostId]);

    const blogPostDeleteDialogHandler = (e) => {
        e.preventDefault();

        setShowDeleteDialog(true);
    };

    const blogPostDeleteHandler = (e) => {
        e.preventDefault();

        blogPostService.deleteBlogPost(blogPostId, user.accessToken)
            .then(() => {
                navigate('/', { state: notification });
            })
            .catch(err => {
                console.log(err.message);
                setError(err.message);
            })
            .finally(() => {
                setShowDeleteDialog(false);
            });
    };

    return (
        <div className="container">
            <ConfirmDialog show={showDeleteDialog} onClose={() => setShowDeleteDialog(false)} onSave={blogPostDeleteHandler} />
            <div className="row">
                <div className="col-sm-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6">
                    <h2 className="heading-margin text-center">Delete this Post</h2>
                    <p className="error-blog-post-delete-message">{error}</p>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="blog-post-create-title" className="form-label">Title</label>
                            <input type="text" name="blog-post-create-title" className="form-control" id="blog-post-create-title" defaultValue={blogPost.title} readOnly placeholder="title" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="blog-post-create-content" className="form-label">Content</label>
                            <textarea name="blog-post-create-content" className="form-control" id="blog-post-create-content" rows="10" defaultValue={blogPost.content} readOnly placeholder="content"></textarea>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="blog-post-create-image-url" className="form-label">Image URL</label>
                            <input type="text" name="blog-post-create-image-url" className="form-control" id="blog-post-create-image-url" defaultValue={blogPost.imageUrl} readOnly placeholder="image URL" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="blog-post-create-categories" className="form-label">Select categories</label>
                            <select multiple className="form-control" id="blog-post-create-categories" name="blog-post-create-categories" value={blogPost.categories} readOnly>
                                {categories.length > 0
                                    ? categories.map(x => <option key={x} value={x}>{x}</option>)
                                    : ''
                                }
                            </select>
                        </div>
                        <button type="submit" className="btn btn-primary" onClick={blogPostDeleteDialogHandler}>Delete</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BlogPostDelete;
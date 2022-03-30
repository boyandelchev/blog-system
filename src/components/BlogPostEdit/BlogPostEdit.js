import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import * as blogPostService from '../../services/blogPostService';
import { useAuthContext } from '../../contexts/AuthContext';

import './BlogPostEdit.css';

const BlogPostEdit = () => {
    const navigate = useNavigate();
    const { blogPostId } = useParams();
    const { user } = useAuthContext();
    const [categories, setCategories] = useState([]);
    const [blogPost, setBlogPost] = useState({});
    const [error, setError] = useState('');
    const [notification, setNotification] = useState({ message: 'You have successfully edited this blog post.', timeOut: 3000 });

    useEffect(() => {
        blogPostService.getAllCategories()
            .then(result => {
                setCategories(result);
            })
            .catch(err => {
                console.log(err.message);
                setError(err.message);
            });

        blogPostService.getOne(blogPostId)
            .then(result => {
                setBlogPost(result);
            })
            .catch(err => {
                console.log(err.message);
                setError(err.message);
            });
    }, [blogPostId]);

    let categoriesData;
    if (categories.length > 0) {
        [categoriesData] = categories;
        categoriesData = categoriesData.categories;
    }

    let authorName = user.email;
    let index = authorName.indexOf('@');
    if (index) {
        authorName = authorName.substring(0, index);
    }

    const blogPostEditHandler = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        let _id = blogPostId;
        let title = formData.get('blog-post-create-title');
        let content = formData.get('blog-post-create-content');
        let imageUrl = formData.get('blog-post-create-image-url');
        let categories = formData.getAll('blog-post-create-categories');

        try {
            if (title.length < 2 || title.length > 100) {
                throw new Error('Title must be between 2 and 100 characters long.');
            }

            if (content.length < 10 || content.length > 5000) {
                throw new Error('Content must be between 10 and 5000 characters long. Please create part 2 if longer.');
            }

            if (imageUrl === '') {
                throw new Error('Please provide a proper URL.');
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
                    setError(err.message);
                });
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }
    };

    return (
        <div className="row">
            <div className="col-sm-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6">
                <h2 className="heading-margin text-center">Edit this Post</h2>
                <p className="error-blog-post-edit-message">{error}</p>
                <form onSubmit={blogPostEditHandler} method="POST">
                    <div className="mb-3">
                        <label htmlFor="blog-post-create-title" className="form-label">Title</label>
                        <input type="text" name="blog-post-create-title" className="form-control" id="blog-post-create-title" defaultValue={blogPost.title} placeholder="title" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="blog-post-create-content" className="form-label">Content</label>
                        <textarea name="blog-post-create-content" className="form-control" id="blog-post-create-content" rows="10" defaultValue={blogPost.content} placeholder="content"></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="blog-post-create-image-url" className="form-label">Image URL</label>
                        <input type="text" name="blog-post-create-image-url" className="form-control" id="blog-post-create-image-url" defaultValue={blogPost.imageUrl} placeholder="image URL" />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="blog-post-create-categories" className="form-label">Select categories</label>
                        <select multiple className="form-control" id="blog-post-create-categories" name="blog-post-create-categories">
                            {(categories.length > 0 && blogPost.categories)
                                ? categoriesData.map(x => {
                                    if (blogPost.categories.includes(x)) {
                                        return <option key={x} defaultValue={x} selected>{x}</option>
                                    } else {
                                        return <option key={x} defaultValue={x}>{x}</option>
                                    }
                                })
                                : ''
                            }
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Edit</button>
                </form>
            </div>
        </div>
    );
};

export default BlogPostEdit;
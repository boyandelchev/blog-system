import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import * as blogPostService from '../../services/blogPostService';

import './BlogPostCreate.css';

const BlogPostCreate = () => {
    const { user } = useContext(AuthContext);
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [notification, setNotification] = useState({ message: 'You have successfully created a blog post.', timeOut: 3000 });

    useEffect(() => {
        blogPostService.getAllCategories()
            .then(result => {
                setCategories(result);
            })
            .catch(err => {
                console.log(err.message);
                setError(err.message);
            });
    }, []);

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

    const onBlogPostCreate = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

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

            if (imageUrl == '') {
                throw new Error('Please provide a proper URL.');
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
                <h2 className="heading-margin text-center">Create a Post</h2>
                <p className="error-blog-post-create-message">{error}</p>
                <form onSubmit={onBlogPostCreate} method="POST">
                    <div className="form-group">
                        <label htmlFor="blog-post-create-title">Title</label>
                        <input type="text" name="blog-post-create-title" className="form-control" id="blog-post-create-title" placeholder="title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="blog-post-create-content">Content</label>
                        <textarea name="blog-post-create-content" className="form-control" id="blog-post-create-content" rows="10" placeholder="content"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="blog-post-create-image-url">Image URL</label>
                        <input type="text" name="blog-post-create-image-url" className="form-control" id="blog-post-create-image-url" placeholder="image URL" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="blog-post-create-categories">Select categories</label>
                        <select multiple className="form-control" id="blog-post-create-categories" name="blog-post-create-categories">
                            {categories.length > 0
                                ? categoriesData.map(x => <option key={x} value={x}>{x}</option>)
                                : ''
                            }
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    );
};

export default BlogPostCreate;
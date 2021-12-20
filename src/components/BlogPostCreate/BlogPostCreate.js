import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import * as blogPostService from '../../services/blogPostService';

const BlogPostCreate = () => {
    const [categories, setCategories] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        blogPostService.getAllCategories()
            .then(result => {
                setCategories(result);
            })
            .catch(result => {
                setCategories([]);
            });
    }, []);

    let categoriesData;
    if (categories.length > 0) {
        [categoriesData] = categories;
        categoriesData = categoriesData.categories;
    }

    const onBlogPostCreate = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        let title = formData.get('blog-post-create-title');
        let content = formData.get('blog-post-create-content');
        let imageUrl = formData.get('blog-post-create-image-url');
        let categories = formData.getAll('blog-post-create-categories');

        blogPostService.create({
            title,
            content,
            imageUrl,
            categories,
        })
            .then(result => {
                navigate('/');
            });
    }

    return (
        <div className="row">
            <div className="col-sm-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6">
                <h2 className="heading-margin text-center">Create a Post</h2>
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
}

export default BlogPostCreate;
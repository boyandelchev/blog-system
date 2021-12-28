import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import * as blogPostService from '../../services/blogPostService';

const BlogPostDelete = () => {
    const [blogPost, setBlogPost] = useState({});
    const [categories, setCategories] = useState([]);
    const { blogPostId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        blogPostService.getOne(blogPostId)
            .then(result => {
                setBlogPost(result);
            });

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

    const onBlogPostDelete = (e) => {
        e.preventDefault();

        blogPostService.deleteBlogPost(blogPostId)
            .then(result => {
                navigate('/');
            });
    };

    return (
        <div className="row">
            <div className="col-sm-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6">
                <h2 className="heading-margin text-center">Delete this Post</h2>
                <form>
                    <div className="form-group">
                        <label htmlFor="blog-post-create-title">Title</label>
                        <input type="text" name="blog-post-create-title" className="form-control" id="blog-post-create-title" defaultValue={blogPost.title} readOnly placeholder="title" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="blog-post-create-content">Content</label>
                        <textarea name="blog-post-create-content" className="form-control" id="blog-post-create-content" rows="10" defaultValue={blogPost.content} readOnly placeholder="content"></textarea>
                    </div>
                    <div className="form-group">
                        <label htmlFor="blog-post-create-image-url">Image URL</label>
                        <input type="text" name="blog-post-create-image-url" className="form-control" id="blog-post-create-image-url" defaultValue={blogPost.imageUrl} readOnly placeholder="image URL" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="blog-post-create-categories">Select categories</label>
                        <select multiple className="form-control" id="blog-post-create-categories" name="blog-post-create-categories" readOnly>
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
                    <button type="submit" className="btn btn-primary" onClick={onBlogPostDelete}>Delete</button>
                </form>
            </div>
        </div>
    );
};

export default BlogPostDelete;
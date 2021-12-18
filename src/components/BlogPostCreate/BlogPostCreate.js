import { useNavigate } from 'react-router-dom';

import * as blogPostService from '../../services/blogPostService';

const BlogPostCreate = () => {
    const navigate = useNavigate();

    const onBlogPostCreate = (e) => {
        e.preventDefault();
        let formData = new FormData(e.currentTarget);

        let title = formData.get('blog-post-create-title');
        let content = formData.get('blog-post-create-content');
        let imageUrl = formData.get('blog-post-create-image-url');
        let category = formData.get('blog-post-create-category');

        blogPostService.create({
            title,
            content,
            imageUrl,
            category,
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
                        <label htmlFor="blog-post-create-category">Category</label>
                        <input type="text" name="blog-post-create-category" className="form-control" id="blog-post-create-category" placeholder="category" />
                    </div>
                    <button type="submit" className="btn btn-primary">Create</button>
                </form>
            </div>
        </div>
    );
}

export default BlogPostCreate;
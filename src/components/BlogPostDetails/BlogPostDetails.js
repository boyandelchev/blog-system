import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import * as blogPostService from '../../services/blogPostService';

import BlogPostCard from './BlogPostCard';

const BlogPostDetails = () => {
    const { user } = useContext(AuthContext);
    const [blogPost, setBlogPost] = useState({});
    const [blogPosts, setBlogPosts] = useState([]);
    const { blogPostId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        blogPostService.getOne(blogPostId)
            .then(result => {
                setBlogPost(result);
            })
            .catch(() => {
                navigate('/error');
            });

        blogPostService.getAll()
            .then(result => {
                setBlogPosts(result);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, [blogPostId]);

    const userButtons = <button type="button" className="btn btn-light m-2"><a href="#">Comment</a></button>;

    const ownerButtons = (
        <>
            {userButtons}
            <button type="button" className="btn btn-warning m-2"><Link to={`/blog-post-edit/${blogPost._id}`}>Edit</Link></button>
            <button type="button" className="btn btn-danger m-2"><Link to={`/blog-post-delete/${blogPost._id}`}>Delete</Link></button>
        </>
    );

    const date = (dateInMilliseconds) => {
        return new Date(dateInMilliseconds)
            .toString()
            .substring(0, 24);
    }

    return (
        <>
            <div className="container">
                <div className="row">

                    <div className="col-md-10 col-md-offset-2 col-xs-12">
                        <div className="mainheading">

                            <div className="row post-top-meta">
                                <div className="col-md-2">
                                    <a href="author.html"><img className="author-thumb" src="https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x" alt="Sal" /></a>
                                </div>
                                <div className="col-md-10">
                                    <a className="link-dark" href="author.html">Sal</a>
                                    <span className="author-description">Founder of WowThemes.net and creator of <b>"Mediumish"</b> theme that you're currently previewing. Developing professional premium themes, templates, plugins, scripts since 2012.</span>
                                    <p className="createdOn-date">{date(blogPost._createdOn)}</p>
                                    {blogPost._updatedOn
                                        ? <p className="updatedOn-date">Updated on: {date(blogPost._updatedOn)}</p>
                                        : ''
                                    }
                                </div>
                            </div>

                            <h1 className="posttitle">{blogPost.title}</h1>

                        </div>

                        <img className="featured-image img-fluid" src={blogPost.imageUrl} alt="" />

                        <div className="article-post">
                            <p>{blogPost.content}</p>
                        </div>

                        <div className="after-post-tags">
                            <ul className="tags">
                                {blogPost.categories
                                    ? blogPost.categories.map(x => <li key={x}><a href="#">{x}</a></li>)
                                    : ''
                                }
                            </ul>
                        </div>

                        {user._id && (user._id == blogPost._ownerId
                            ? ownerButtons
                            : userButtons
                        )}

                    </div>

                </div>
            </div>

            <div className="hideshare"></div>

            <div className="graybg">
                <div className="container">
                    <div className="row listrecent listrelated">
                        {blogPosts.map(x => <BlogPostCard key={x._id} blogPost={x} />)}
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogPostDetails;
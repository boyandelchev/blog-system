import { useState, useEffect } from 'react';
import { useParams, useNavigate, Link, useLocation } from 'react-router-dom';

import * as blogPostService from '../../services/blogPostService';
import { useAuthContext } from '../../contexts/AuthContext';
import useNotification from '../../hooks/useNotification';

import BlogPostDetailsCommentForm from './BlogPostDetailsCommentForm';
import BlogPostDetailsComment from './BlogPostDetailsComment';
import BlogPostCard from './BlogPostCard';
import './BlogPostDetails.css';

const BlogPostDetails = () => {
    const navigate = useNavigate();
    const { blogPostId } = useParams();
    const { user } = useAuthContext();
    const [blogPost, setBlogPost] = useState({});
    const [blogPosts, setBlogPosts] = useState([]);
    const [comments, setComments] = useState([]);
    const [error, setError] = useState('');

    const { key, state } = useLocation();
    const [notification, clearNotification] = useNotification(state?.message, state?.timeOut);

    useEffect(() => {
        blogPostService.getOne(blogPostId)
            .then(result => {
                setBlogPost(result);
            })
            .catch(() => {
                navigate('/error');
            });

        blogPostService.getLastThree()
            .then(result => {
                setBlogPosts(result);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, [blogPostId]);

    useEffect(() => {
        blogPostService.getAllComments(blogPostId)
            .then(result => {
                setComments(result);
            })
            .catch(err => {
                console.log(err.message);
                setError(err.message);
            });
    }, [blogPostId, key]);

    useEffect(() => {
        clearNotification();
    }, []);

    const ownerButtons = (
        <>
            <Link to={`/blog-post-edit/${blogPost._id}`}><button type="button" className="btn btn-warning m-2">Edit</button></Link>
            <Link to={`/blog-post-delete/${blogPost._id}`}><button type="button" className="btn btn-danger m-2">Delete</button></Link>
        </>
    );

    const date = (dateInMilliseconds) => {
        return new Date(dateInMilliseconds)
            .toString()
            .substring(0, 24);
    };

    const blogPostDetailsCommentFormHandler = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let { commentContent } = Object.fromEntries(formData);
        let content = commentContent;
        let authorName = user.email;

        try {
            if (content.length < 2 || content.length > 500) {
                throw new Error('Comment must be between 2 and 500 characters long.');
            }

            blogPostService.createComment({
                content,
                authorName,
                blogPostId,
            }, user.accessToken)
                .then(() => {
                    navigate(`/blog-post-details/${blogPostId}`);
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
        <>
            <div className="container">
                <div className="row">
                    {notification}
                    <div className="col-md-10 col-md-offset-2 col-xs-12">
                        <div className="mainheading">

                            <div className="row post-top-meta">
                                <div className="col-md-2">
                                    <a href="#"><img className="author-thumb" src="https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x" alt="Sal" /></a>
                                </div>
                                <div className="col-md-10">
                                    <a className="link-dark" href="#">Author: {blogPost.authorName}</a>
                                    <span className="author-description"></span>
                                    <p className="createdOn-date">Posted on: {date(blogPost._createdOn)}</p>
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
                                    ? blogPost.categories.map(x => <li key={x}><a className="text-decoration-none" href="#">{x}</a></li>)
                                    : ''
                                }
                            </ul>
                        </div>

                        {user._id && (user._id === blogPost._ownerId
                            ? ownerButtons
                            : ''
                        )}

                        <p className="error-blog-post-details-comment-message">{error}</p>
                        {user._id
                            ? <BlogPostDetailsCommentForm onBlogPostDetailsCommentForm={blogPostDetailsCommentFormHandler} />
                            : ''
                        }

                        {comments.length > 0
                            ? comments.map(x => <BlogPostDetailsComment key={x._id} comment={x} />)
                            : ''
                        }

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
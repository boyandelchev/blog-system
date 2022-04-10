import { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';

import * as blogPostService from '../../services/blogPostService';
import * as commentService from '../../services/commentService';
import { AuthContext } from '../../contexts/AuthContext';
import getDateFromDateInMilliseconds from '../../utils/getDateFromDateInMilliseconds';
import getAuthorNameFromUserEmail from '../../utils/getAuthorNameFromUserEmail';
import validateForm from '../../utils/validateForm';

import { COMMENT_CONTENT_MIN_LENGTH, COMMENT_CONTENT_ERROR } from './BlogPostDetailsConstants';
import { useCommentChangeHandler } from './BlogPostDetailsHelpers';
import BlogPostDetailsCommentForm from './BlogPostDetailsCommentForm';
import BlogPostDetailsComment from './BlogPostDetailsComment';
import BlogPostCard from './BlogPostCard';
import './BlogPostDetails.css';

const BlogPostDetails = () => {
    const timeout = 3000;
    const navigate = useNavigate();
    const { blogPostId } = useParams();
    const { user } = useContext(AuthContext);
    const [blogPost, setBlogPost] = useState({});
    const createdOnDate = getDateFromDateInMilliseconds(blogPost._createdOn);
    const updatedOnDate = getDateFromDateInMilliseconds(blogPost._updatedOn);
    const authorName = getAuthorNameFromUserEmail(user.email);
    const [comments, setComments] = useState([]);
    const [blogPosts, setBlogPosts] = useState([]);
    const { error, setError, changeHandler } = useCommentChangeHandler();
    const [isDisabled, setIsDisabled] = useState(false);

    useEffect(() => {
        blogPostService.getOne(blogPostId)
            .then(blogPostData => {
                setBlogPost(blogPostData);
            })
            .catch(() => {
                navigate('/error');
            });
    }, [blogPostId, navigate]);

    useEffect(() => {
        commentService.getAll(blogPostId)
            .then(commentsData => {
                setComments(commentsData);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, [blogPostId]);

    useEffect(() => {
        blogPostService.getLastThree()
            .then(blogPostsData => {
                setBlogPosts(blogPostsData);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, []);

    const blogPostDetailsCommentFormHandler = (e) => {
        e.preventDefault();

        if (!validateForm(error)) {
            return;
        }

        let formData = new FormData(e.currentTarget);

        let { commentContent: content } = Object.fromEntries(formData);

        if (content.length < COMMENT_CONTENT_MIN_LENGTH) {
            setError(COMMENT_CONTENT_ERROR);
            return;
        }

        setIsDisabled(true);

        commentService.create({
            content,
            authorName,
            blogPostId,
        })
            .then(commentData => {
                setComments(state => [...state, commentData]);
            })
            .catch(err => {
                console.log(err.message);
                setError(err.message);
            });

        setTimeout(() => setIsDisabled(false), timeout);
    };

    const ownerButtons = (
        <>
            <Link to={`/blog-post-edit/${blogPost._id}`}><button type="button" className="btn btn-warning m-2">Edit</button></Link>
            <Link to={`/blog-post-delete/${blogPost._id}`}><button type="button" className="btn btn-danger m-2">Delete</button></Link>
        </>
    );

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-10 col-md-offset-2 col-xs-12">
                        <div className="mainheading">
                            <div className="row post-top-meta">
                                <div className="col-md-2">
                                    <a href="# "><img className="author-thumb" src="/img/profile-image-32x32.png" alt="profile" /></a>
                                </div>
                                <div className="col-md-10">
                                    <a className="link-dark" href="# ">Author: {blogPost.authorName}</a>
                                    <span className="author-description"></span>
                                    <p className="createdOn-date">Posted on: {createdOnDate}</p>
                                    {blogPost._updatedOn
                                        ? <p className="updatedOn-date">Updated on: {updatedOnDate}</p>
                                        : ''
                                    }
                                </div>
                            </div>
                            <h1 className="posttitle">{blogPost.title}</h1>
                        </div>
                        <img className="featured-image img-fluid" src={blogPost.imageURL} alt="" />
                        <div className="article-post">
                            <p>{blogPost.content}</p>
                        </div>
                        <div className="after-post-tags">
                            <ul className="tags">
                                {blogPost.categories
                                    ? blogPost.categories.map(x => <li key={x}><a className="text-decoration-none" href="# ">{x}</a></li>)
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
                            ? <BlogPostDetailsCommentForm
                                blogPostDetailsCommentFormHandler={blogPostDetailsCommentFormHandler}
                                changeHandler={changeHandler}
                                isDisabled={isDisabled}
                            />
                            : ''
                        }

                        <h5 className="text-center">Comments</h5>
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
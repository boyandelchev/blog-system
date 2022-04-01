import { useState, useEffect } from 'react';

import * as blogPostService from '../../services/blogPostService';
import { useAuthContext } from '../../contexts/AuthContext';
import useAuthorName from '../../hooks/useAuthorName';

import MyBlogPost from './MyBlogPost';

const MyBlogPosts = () => {
    const { user } = useAuthContext();
    const authorName = useAuthorName(user.email);
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        blogPostService.getAllMine(user._id)
            .then(blogPostsResult => {
                setBlogPosts(blogPostsResult);
            })
            .catch(err => {
                console.log(err.message);
            });
    }, [user._id]);

    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 col-md-offset-2">
                        <div className="mainheading">
                            <div className="row post-top-meta authorpage">
                                <div className="col-md-10 col-xs-12">
                                    <h1>{authorName}</h1>
                                    <span className="author-description">List of all posted articles by <b>{authorName}</b>.</span>
                                </div>
                                <div className="col-md-2 col-xs-12">
                                    <img className="author-thumb" src="https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x" alt="Sal" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="graybg authorpage">
                <div className="container">
                    <div className="listrecent listrelated">
                        {blogPosts.length > 0
                            ? blogPosts.map(x => <MyBlogPost key={x._id} blogPost={x} />)
                            : <p>You do not have any blog posts yet.</p>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default MyBlogPosts;
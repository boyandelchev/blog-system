import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from 'react-router-dom';

import * as blogPostService from '../../services/blogPostService';

const BlogPostDetails = () => {
    const [blogPost, setBlogPost] = useState({});
    const { blogPostId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        blogPostService.getOne(blogPostId)
            .then(result => {
                setBlogPost(result);
            })
            .catch(result => {
                navigate('/error');
            });
    }, []);

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
                                    <span className="post-date">{blogPost.createdOn}</span>
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
                                    ? blogPost.categories.map(x => (<li key={x}><a href="#">{x}</a></li>))
                                    : ''
                                }
                            </ul>
                        </div>

                        <button type="button" className="btn btn-warning m-2"><Link to={`/blog-post-edit/${blogPost._id}`}>Edit</Link></button>
                        <button type="button" className="btn btn-danger m-2"><Link to={`/blog-post-delete/${blogPost._id}`}>Delete</Link></button>

                    </div>

                </div>
            </div>

            <div className="hideshare"></div>

            <div className="graybg">
                <div className="container">
                    <div className="row listrecent listrelated">

                        <div className="col-md-4">
                            <div className="card">
                                <a href="post.html">
                                    <img className="img-fluid img-thumb" src="/img/demopic/9.jpg" alt="" />
                                </a>
                                <div className="card-block">
                                    <h2 className="card-title"><a href="post.html">Best recreational places to visit on a holiday</a></h2>
                                    <div className="metafooter">
                                        <div className="wrapfooter">
                                            <span className="meta-footer-thumb">
                                                <a href="author.html"><img className="author-thumb" src="https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x" alt="Sal" /></a>
                                            </span>
                                            <span className="author-meta">
                                                <span className="post-name"><a href="author.html">Sal</a></span><br />
                                                <span className="post-date">22 July 2017</span><span className="dot"></span><span className="post-read">6 min read</span>
                                            </span>
                                            <span className="post-read-more"><a href="post.html" title="Read Story"><svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25"><path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fillRule="evenodd"></path></svg></a></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card">
                                <a href="post.html">
                                    <img className="img-fluid img-thumb" src="/img/demopic/8.jpg" alt="" />
                                </a>
                                <div className="card-block">
                                    <h2 className="card-title"><a href="post.html">How travelling can change your life</a></h2>
                                    <div className="metafooter">
                                        <div className="wrapfooter">
                                            <span className="meta-footer-thumb">
                                                <a href="author.html"><img className="author-thumb" src="https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x" alt="Sal" /></a>
                                            </span>
                                            <span className="author-meta">
                                                <span className="post-name"><a href="author.html">Sal</a></span><br />
                                                <span className="post-date">22 July 2017</span><span className="dot"></span><span className="post-read">6 min read</span>
                                            </span>
                                            <span className="post-read-more"><a href="post.html" title="Read Story"><svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25"><path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fillRule="evenodd"></path></svg></a></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-4">
                            <div className="card">
                                <a href="post.html">
                                    <img className="img-fluid img-thumb" src="/img/demopic/7.jpg" alt="" />
                                </a>
                                <div className="card-block">
                                    <h2 className="card-title"><a href="post.html">Little red dress and a perfect summer</a></h2>
                                    <div className="metafooter">
                                        <div className="wrapfooter">
                                            <span className="meta-footer-thumb">
                                                <a href="author.html"><img className="author-thumb" src="https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x" alt="Sal" /></a>
                                            </span>
                                            <span className="author-meta">
                                                <span className="post-name"><a href="author.html">Sal</a></span><br />
                                                <span className="post-date">22 July 2017</span><span className="dot"></span><span className="post-read">6 min read</span>
                                            </span>
                                            <span className="post-read-more"><a href="post.html" title="Read Story"><svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25"><path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fillRule="evenodd"></path></svg></a></span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </>
    );
}

export default BlogPostDetails;
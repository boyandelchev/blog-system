import { Link } from 'react-router-dom';

import useDate from '../../../hooks/useDate';

const BlogPostCard = ({
    blogPost,
}) => {
    const date = useDate(blogPost._createdOn);

    return (
        <div className="col-md-4">
            <div className="card">
                <Link to={`/blog-post-details/${blogPost._id}`}>
                    <img className="img-fluid img-thumb" src={blogPost.imageUrl} alt="" />
                </Link>
                <div className="card-body">
                    <h2 className="card-title"><Link className="text-decoration-none" to={`/blog-post-details/${blogPost._id}`}>{blogPost.title}</Link></h2>
                    <div className="metafooter">
                        <div className="wrapfooter">
                            <span className="meta-footer-thumb">
                                <a href="#"><img className="author-thumb" src="https://www.gravatar.com/avatar/e56154546cf4be74e393c62d1ae9f9d4?s=250&amp;d=mm&amp;r=x" alt="Sal" /></a>
                            </span>
                            <span className="author-meta">
                                <span className="post-name"><a className="text-decoration-none" href="#">{blogPost.authorName}</a></span><br />
                                <span className="post-date">{date}</span>
                            </span>
                            <span className="post-read-more">
                                <Link to={`/blog-post-details/${blogPost._id}`} title="Read Story">
                                    <svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25">
                                        <path d="M19 6c0-1.1-.9-2-2-2H8c-1.1 0-2 .9-2 2v14.66h.012c.01.103.045.204.12.285a.5.5 0 0 0 .706.03L12.5 16.85l5.662 4.126a.508.508 0 0 0 .708-.03.5.5 0 0 0 .118-.285H19V6zm-6.838 9.97L7 19.636V6c0-.55.45-1 1-1h9c.55 0 1 .45 1 1v13.637l-5.162-3.668a.49.49 0 0 0-.676 0z" fillRule="evenodd"></path>
                                    </svg>
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BlogPostCard;
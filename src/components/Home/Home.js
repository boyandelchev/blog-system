import { useState, useEffect } from 'react';

import * as blogPostService from '../../services/blogPostService';

import FeaturedBlogPost from './FeaturedBlogPost';
import BlogPost from './BlogPost';

const Home = () => {
    const [blogPosts, setBlogPosts] = useState([]);

    useEffect(() => {
        blogPostService.getAll()
            .then(result => {
                setBlogPosts(result);
            })
            .catch(result => {
                setBlogPosts([]);
            });
    }, []);

    return (
        <div className="container">
            <div className="mainheading">
                <h1 className="sitetitle">Blog System</h1>
                <p className="lead">
                    Stories about all kinds of topics
                </p>
            </div>

            <section className="featured-posts">
                <div className="section-title">
                    <h2><span>Featured</span></h2>
                </div>
                <div className="card-columns listfeaturedtag">
                    {blogPosts.length > 0
                        ? blogPosts.map(x => <FeaturedBlogPost key={x._id} blogPost={x} />)
                        : <p>No Featured Blog Posts</p>
                    }
                </div>
            </section>

            <section className="recent-posts">
                <div className="section-title">
                    <h2><span>All Recent Posts</span></h2>
                </div>
                <div className="card-columns listrecent">
                    {blogPosts.length > 0
                        ? blogPosts.map(x => <BlogPost key={x._id} blogPost={x} />)
                        : <p>No Blog Posts</p>
                    }
                </div>
            </section>

        </div>
    );
};

export default Home;
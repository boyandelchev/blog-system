import { useState } from 'react';

import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import ErrorPage from './components/ErrorPage/ErrorPage';
import Home from './components/Home/Home';
import BlogPostDetails from './components/BlogPostDetails/BlogPostDetails';

function App() {
    const [page, setPage] = useState('/home');

    const navigationChangeHandler = (path) => {
        setPage(path);
    };

    const router = (path) => {
        let pathNames = path.split('/');

        let rootPath = pathNames[1];
        let argument = pathNames[2];

        const routes = {
            'home': <Home navigationChangeHandler={navigationChangeHandler} />,
            'details': <BlogPostDetails id={argument} />,
        };

        return routes[rootPath]
    };

    return (
        <div className="App">
            <Header navigationChangeHandler={navigationChangeHandler} />

            <main id="main-content">
                {router(page) || <ErrorPage />}
            </main>

            <Footer />

            {/* <nav className="navbar navbar-toggleable-md navbar-light bg-white fixed-top mediumnavigation">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="container">

                    <a className="navbar-brand" href="index.html">
                        <img src="img/logo.png" alt="" />
                    </a>

                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item active">
                                <a className="nav-link" href="index.html">Stories <span className="sr-only">(current)</span></a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="post.html">Post</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link" href="author.html">Author</a>
                            </li>
                        </ul>

                        <form className="form-inline my-2 my-lg-0">
                            <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                            <span className="search-icon"><svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25"><path d="M20.067 18.933l-4.157-4.157a6 6 0 1 0-.884.884l4.157 4.157a.624.624 0 1 0 .884-.884zM6.5 11c0-2.62 2.13-4.75 4.75-4.75S16 8.38 16 11s-2.13 4.75-4.75 4.75S6.5 13.62 6.5 11z"></path></svg></span>
                        </form>

                    </div>
                </div>
            </nav>

            <div className="container">
                <div className="row">
                    <div className="col-md-2"></div>
                    <div className="col-md-8 col-md-offset-2">
                        <div className="mainheading">
                            <div className="row post-top-meta authorpage">
                                <div className="col-md-10 col-xs-12">
                                    <h1>Sal</h1>
                                    <span className="author-description">Founder of <a target="_blank" href="https://www.wowthemes.net">WowThemes.net</a> and creator of <strong>"Mediumish"</strong> theme that you're currently previewing. I professionally develop premium themes, templates & scripts since the Apocalypse (2012). You can reach me out on the social links below.</span>
                                    <div className="sociallinks"><a target="_blank" href="https://www.facebook.com/wowthemesnet/"><i className="fa fa-facebook"></i></a> <span className="dot"></span> <a target="_blank" href="https://plus.google.com/s/wowthemesnet/top"><i className="fa fa-google-plus"></i></a></div>
                                    <a target="_blank" href="https://twitter.com/wowthemesnet" className="btn follow">Follow</a>
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

                        <div className="authorpostbox">
                            <div className="card">
                                <a href="author.html">
                                    <img className="img-fluid img-thumb" src="img/demopic/8.jpg" alt="" />
                                </a>
                                <div className="card-block">
                                    <h2 className="card-title"><a href="post.html">Life is worth living forever and ever</a></h2>
                                    <h4 className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</h4>
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

                        <div className="authorpostbox">
                            <div className="card">
                                <a href="author.html">
                                    <img className="img-fluid img-thumb" src="img/demopic/10.jpg" alt="" />
                                </a>
                                <div className="card-block">
                                    <h2 className="card-title"><a href="post.html">Best European capitals to visit and the costs implied</a></h2>
                                    <h4 className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</h4>
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

                        <div className="authorpostbox">
                            <div className="card">
                                <a href="author.html">
                                    <img className="img-fluid img-thumb" src="img/demopic/9.jpg" alt="" />
                                </a>
                                <div className="card-block">
                                    <h2 className="card-title"><a href="post.html">10 Things you should learn before visiting</a></h2>
                                    <h4 className="card-text">This is a longer card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</h4>
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

            <div className="container">
                <div className="footer">
                    <p className="pull-left">
                        Copyright &copy; 2017 Your Website Name
                    </p>
                    <p className="pull-right">
                        Mediumish Theme by <a target="_blank" href="https://www.wowthemes.net">WowThemes.net</a>
                    </p>
                    <div className="clearfix"></div>
                </div>
            </div> */}

        </div>
    );
}

export default App;

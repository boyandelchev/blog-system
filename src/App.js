import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import * as authService from './services/authService';

import Header from './components/Header';
import Home from './components/Home';
import Login from './components/Login';
import Logout from './components/Logout';
import Register from './components/Register';
import MyBlogPosts from './components/MyBlogPosts';
import BlogPostCreate from './components/BlogPostCreate';
import BlogPostDetails from './components/BlogPostDetails';
import Footer from './components/Footer';
import ErrorPage from './components/ErrorPage';

function App() {
    const [userInfo, setUserInfo] = useState({ isAuthenticated: false, username: '' });

    useEffect(() => {
        let username = authService.getUser();

        setUserInfo({
            isAuthenticated: Boolean(username),
            username,
        });
    }, []);

    const onLogin = (username) => {
        setUserInfo({
            isAuthenticated: true,
            username,
        });
    };

    const onLogout = () => {
        setUserInfo({
            isAuthenticated: false,
            username: null,
        });
    };

    return (
        <div id="container">
            <Header {...userInfo} />

            <main id="main-content">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login onLogin={onLogin} />} />
                    <Route path="/logout" element={<Logout onLogout={onLogout} />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/my-posts" element={<MyBlogPosts />} />
                    <Route path="/blog-post-create" element={<BlogPostCreate />} />
                    <Route path="/blog-post-details/:blogPostId" element={<BlogPostDetails />} />
                    <Route path="/error" element={<ErrorPage />} />
                    <Route path="/*" element={<ErrorPage />} />
                </Routes>
            </main>

            <Footer />
        </div>
    );
}

export default App;

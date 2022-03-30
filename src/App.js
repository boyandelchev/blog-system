import { Routes, Route } from 'react-router-dom';

import { AuthContext } from './contexts/AuthContext';
import useLocalStorage from './hooks/useLocalStorage';

import Header from './components/Header';
import Home from './components/Home';
import Register from './components/Register';
import Login from './components/Login';
import Logout from './components/Logout';
import MyBlogPosts from './components/MyBlogPosts';
import BlogPostCreate from './components/BlogPostCreate';
import BlogPostEdit from './components/BlogPostEdit';
import BlogPostDelete from './components/BlogPostDelete';
import BlogPostDetails from './components/BlogPostDetails';
import Footer from './components/Footer';
import ErrorPage from './components/ErrorPage';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const initialAuthState = {
    _id: '',
    email: '',
    accessToken: '',
};

function App() {
    const [user, setUser] = useLocalStorage('user', initialAuthState);

    const login = (authData) => {
        setUser(authData);
    };

    const logout = () => {
        setUser(initialAuthState);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            <div id="container">
                <Header />

                <main id="main-content">
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/register" element={<Register />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/logout" element={<Logout />} />
                        <Route path="/my-posts" element={<MyBlogPosts />} />
                        <Route path="/blog-post-create" element={<BlogPostCreate />} />
                        <Route path="/blog-post-edit/:blogPostId" element={<BlogPostEdit />} />
                        <Route path="/blog-post-delete/:blogPostId" element={<BlogPostDelete />} />
                        <Route path="/blog-post-details/:blogPostId" element={<BlogPostDetails />} />
                        <Route path="/error" element={<ErrorPage />} />
                        <Route path="/*" element={<ErrorPage />} />
                    </Routes>
                </main>

                <Footer />
            </div>
        </AuthContext.Provider>
    );
}

export default App;

import { Routes, Route } from 'react-router-dom';

import { AuthProvider } from './contexts/AuthContext';
import { NotificationProvider } from './contexts/NotificationContext';

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
import ErrorPage from './components/common/ErrorPage';
import ErrorBoundary from './components/common/ErrorBoundary';
import Notification from './components/common/Notification';
import PrivateRoute from './components/common/PrivateRoute';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <NotificationProvider>
          <div id="container">
            <Header />

            <Notification />

            <main id="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/blog-post-details/:blogPostId" element={<BlogPostDetails />} />
                <Route path="/error" element={<ErrorPage />} />
                <Route path="/*" element={<ErrorPage />} />

                <Route element={<PrivateRoute />}>
                  <Route path="/logout" element={<Logout />} />
                  <Route path="/my-posts" element={<MyBlogPosts />} />
                  <Route path="/blog-post-create" element={<BlogPostCreate />} />
                  <Route path="/blog-post-edit/:blogPostId" element={<BlogPostEdit />} />
                  <Route path="/blog-post-delete/:blogPostId" element={<BlogPostDelete />} />
                </Route>
              </Routes>
            </main>

            <Footer />
          </div>
        </NotificationProvider>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;

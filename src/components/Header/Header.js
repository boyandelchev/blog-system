import { NavLink } from 'react-router-dom';

import { useAuthContext } from '../../contexts/AuthContext';

const Header = () => {
    const { user } = useAuthContext();

    const activeClassNameHandler = ({ isActive }) => "nav-link" + (isActive ? " btn btn-outline-secondary bg-secondary text-white" : "");

    let guestNavigation = (
        <>
            <li className="nav-item">
                <NavLink className={activeClassNameHandler} to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className={activeClassNameHandler} to="/register">Register</NavLink>
            </li>
        </>
    );

    let userNavigation = (
        <>
            <li className="nav-item">
                <NavLink className={activeClassNameHandler} to="/blog-post-create">Create a Post</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className={activeClassNameHandler} to="/my-posts">My Posts</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className={activeClassNameHandler} to="/logout">Logout</NavLink>
            </li>
        </>
    );

    return (
        <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-white fixed-top mediumnavigation">
                <div className="container">
                    <NavLink className="navbar-brand" to="/">
                        <img src="/img/logo.png" alt="logo" />
                    </NavLink>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">
                        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                            <li className="nav-item">
                                <NavLink className={activeClassNameHandler} to="/">All Posts</NavLink>
                            </li>
                            {user.email
                                ? userNavigation
                                : guestNavigation
                            }
                            {/* <form className="d-flex ms-1 mt-1">
                                <input className="form-control me-2" type="text" placeholder="Search" aria-label="Search" />
                                <button class="btn btn-outline-success" type="submit">
                                    <svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25">
                                        <path d="M20.067 18.933l-4.157-4.157a6 6 0 1 0-.884.884l4.157 4.157a.624.624 0 1 0 .884-.884zM6.5 11c0-2.62 2.13-4.75 4.75-4.75S16 8.38 16 11s-2.13 4.75-4.75 4.75S6.5 13.62 6.5 11z"></path>
                                    </svg>
                                </button>
                            </form> */}
                        </ul>
                    </div>
                </div>
            </nav>
        </header>
    );
};

export default Header;
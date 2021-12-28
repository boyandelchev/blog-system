import { useContext } from 'react';
import { NavLink } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';

const Header = () => {
    const { user } = useContext(AuthContext);

    let guestNavigation = (
        <>
            <li className="nav-item">
                <NavLink className={({ isActive }) => "nav-link" + (isActive ? " btn btn-outline-secondary" : "")} to="/login">Login</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className={({ isActive }) => "nav-link" + (isActive ? " btn btn-outline-secondary" : "")} to="/register">Register</NavLink>
            </li>
        </>
    );

    let userNavigation = (
        <>
            <li className="nav-item">
                <NavLink className={({ isActive }) => "nav-link" + (isActive ? " btn btn-outline-secondary" : "")} to="/blog-post-create">Create a Post</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className={({ isActive }) => "nav-link" + (isActive ? " btn btn-outline-secondary" : "")} to="/my-posts">My Posts</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className={({ isActive }) => "nav-link" + (isActive ? " btn btn-outline-secondary" : "")} to="/logout">Logout</NavLink>
            </li>
        </>
    );

    return (
        <header>
            <nav className="navbar navbar-toggleable-md navbar-light bg-white fixed-top mediumnavigation">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarsExampleDefault" aria-controls="navbarsExampleDefault" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="container">

                    <NavLink className="navbar-brand float-left" to="/">
                        <img src="/img/logo.png" alt="logo" />
                    </NavLink>

                    <form className="form-inline my-2 my-lg-0 float-left">
                        <input className="form-control mr-sm-2" type="text" placeholder="Search" />
                        <span className="search-icon"><svg className="svgIcon-use" width="25" height="25" viewBox="0 0 25 25"><path d="M20.067 18.933l-4.157-4.157a6 6 0 1 0-.884.884l4.157 4.157a.624.624 0 1 0 .884-.884zM6.5 11c0-2.62 2.13-4.75 4.75-4.75S16 8.38 16 11s-2.13 4.75-4.75 4.75S6.5 13.62 6.5 11z"></path></svg></span>
                    </form>

                    <div className="collapse navbar-collapse" id="navbarsExampleDefault">

                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <NavLink className={({ isActive }) => "nav-link" + (isActive ? " btn btn-outline-secondary" : "")} to="/">All Posts<span className="sr-only">(current)</span></NavLink>
                            </li>
                            {user.email
                                ? userNavigation
                                : guestNavigation
                            }
                        </ul>

                    </div>

                </div>
            </nav>
        </header>
    );
};

export default Header;
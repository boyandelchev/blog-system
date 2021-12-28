import { useContext, useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import useNotification from '../../hooks/useNotification';
import * as authService from '../../services/authService';

import './Login.css';

const Login = () => {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const { state } = useLocation();
    const [notification, clearNotification] = useNotification(state?.message, state?.timeOut);

    useEffect(() => {
        clearNotification();
    }, []);

    const onLoginHandler = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);

        let email = formData.get('email');
        let password = formData.get('password');

        try {
            if (email == '') {
                throw new Error('Please fill in your email address.');
            }

            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters long.');
            }

            authService.login(email, password)
                .then(authData => {
                    login(authData);

                    navigate('/');
                })
                .catch(err => {
                    console.log(err);
                    setError(err);
                });
        } catch (err) {
            console.log(err.message);
            setError(err.message);
        }
    };

    return (
        <div className="row">
            <div className="col-sm-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6">
                {notification}
                <h2 className="heading-margin text-center">Login</h2>
                <p className="error-login-message">{error}</p>
                <form onSubmit={onLoginHandler} method="POST">
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className="form-control" id="password" placeholder="Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;
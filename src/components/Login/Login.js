import { useEffect, useContext } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import * as authService from '../../services/authService';
import { AuthContext } from '../../contexts/AuthContext';
import useLoginRegisterChangeHandler from '../../hooks/useLoginRegisterChangeHandler';
import validateForm from '../../utils/validateForm';
import debounce from '../../utils/debounce';
import useNotification from '../../hooks/useNotification';
import { EMPTY_FORM_ERROR } from '../../constants/constants';

import './Login.css';

const Login = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const { error, setError, changeHandler } = useLoginRegisterChangeHandler();

    const { state } = useLocation();
    const [notification, clearNotification] = useNotification(state?.message, state?.timeOut);

    useEffect(() => {
        clearNotification();
    }, [clearNotification]);

    const loginHandler = (e) => {
        e.preventDefault();

        if (!validateForm(error)) {
            return;
        }

        let formData = new FormData(e.currentTarget);

        let { email, password } = Object.fromEntries(formData);

        if (email === '' || password === '') {
            setError(EMPTY_FORM_ERROR);
            return;
        }

        authService.login(email, password)
            .then(authData => {
                login(authData);

                navigate('/');
            })
            .catch(err => {
                console.log(err.message);
                setError(err.message);
            });
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6">
                    {notification}
                    <h2 className="heading-margin text-center">Login</h2>
                    <p className="error-login-message">{error}</p>
                    <form onSubmit={loginHandler} method="POST">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" name="email" className="form-control" id="email" onChange={debounce(changeHandler)} aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" name="password" className="form-control" id="password" onChange={debounce(changeHandler)} placeholder="Password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
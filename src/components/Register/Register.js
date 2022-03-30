import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as authService from '../../services/authService';
import { AuthContext } from '../../contexts/AuthContext';

import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);
    const [error, setError] = useState('');

    const onRegisterHandler = (e) => {
        e.preventDefault();

        let formData = new FormData(e.currentTarget);
        let { email, password } = Object.fromEntries(formData);
        let repeatPass = formData.get('repeat-password');

        try {
            if (email === '') {
                throw new Error('Please fill in your email address.');
            }

            if (password.length < 6) {
                throw new Error('Password must be at least 6 characters long.');
            }

            if (password !== repeatPass) {
                throw new Error('Passwords do not match.');
            }

            authService.register(email, password)
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
                <h2 className="heading-margin text-center">Register</h2>
                <p className="error-register-message">{error}</p>
                <form onSubmit={onRegisterHandler} method="POST">
                    <div className="form-group">
                        <label htmlFor="email">Email address</label>
                        <input type="email" name="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" name="password" className="form-control" id="password" placeholder="Password" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="repeat-password">Repeat Password</label>
                        <input type="password" name="repeat-password" className="form-control" id="repeat-password" placeholder="Repeat Password" />
                    </div>
                    <button type="submit" className="btn btn-primary">Register</button>
                </form>
            </div>
        </div>
    );
};

export default Register;
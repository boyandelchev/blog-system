import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as authService from '../../services/authService';
import { useAuthContext } from '../../contexts/AuthContext';
import useLoginRegisterInputChangeHandler from '../../hooks/useLoginRegisterInputChangeHandler';
import useValidateForm from '../../hooks/useValidateForm';
import { EMPTY_FORM_ERROR, PASSWORDS_MISMATCH_ERROR } from '../../constants';

import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuthContext();
    const [error, setError] = useState('');
    const inputChangeHandler = useLoginRegisterInputChangeHandler(setError);
    const validateForm = useValidateForm();

    const registerHandler = (e) => {
        e.preventDefault();

        if (validateForm(error)) {
            let formData = new FormData(e.currentTarget);

            let {
                email,
                password,
                'repeat-password': repeatPassword
            } = Object.fromEntries(formData);

            if (email === '' || password === '' || repeatPassword === '') {
                setError(EMPTY_FORM_ERROR);
                return;
            }

            if (password !== repeatPassword) {
                setError(PASSWORDS_MISMATCH_ERROR);
                return;
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
        }
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-sm-12 offset-md-1 col-md-10 offset-lg-2 col-lg-8 offset-xl-3 col-xl-6">
                    <h2 className="heading-margin text-center">Register</h2>
                    <p className="error-register-message">{error}</p>
                    <form onSubmit={registerHandler} method="POST">
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" name="email" className="form-control" id="email" onChange={inputChangeHandler} aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" name="password" className="form-control" id="password" onChange={inputChangeHandler} placeholder="Password" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="repeat-password" className="form-label">Repeat Password</label>
                            <input type="password" name="repeat-password" className="form-control" id="repeat-password" onChange={inputChangeHandler} placeholder="Repeat Password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
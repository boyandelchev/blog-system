import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as authService from '../../services/authService';
import { useAuthContext } from '../../contexts/AuthContext';
import useLoginRegisterChangeHandler from '../../hooks/useLoginRegisterChangeHandler';
import useValidateForm from '../../hooks/useValidateForm';
import useDebounce from '../../hooks/useDebounce';
import { EMPTY_FORM_ERROR, PASSWORDS_MISMATCH_ERROR } from '../../constants/constants';

import './Register.css';

const Register = () => {
    const navigate = useNavigate();
    const { login } = useAuthContext();
    const [error, setError] = useState('');
    const changeHandler = useLoginRegisterChangeHandler(setError);
    const validateForm = useValidateForm();
    const debounce = useDebounce();

    const registerHandler = (e) => {
        e.preventDefault();

        if (!validateForm(error)) {
            return;
        }

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
                            <input type="email" name="email" className="form-control" id="email" onChange={debounce(changeHandler)} aria-describedby="emailHelp" placeholder="Enter email" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input type="password" name="password" className="form-control" id="password" onChange={debounce(changeHandler)} placeholder="Password" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="repeat-password" className="form-label">Repeat Password</label>
                            <input type="password" name="repeat-password" className="form-control" id="repeat-password" onChange={debounce(changeHandler)} placeholder="Repeat Password" />
                        </div>
                        <button type="submit" className="btn btn-primary">Register</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
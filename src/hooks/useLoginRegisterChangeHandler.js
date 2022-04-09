import { useState, useCallback } from 'react';

import { LOGIN_REGISTER } from '../constants/constants';

const useLoginRegisterChangeHandler = () => {
    const [error, setError] = useState('');

    const changeHandler = useCallback((e) => {
        const { name, value } = e.target;

        if (name === LOGIN_REGISTER.emailName) {
            if (value === '') {
                setError(LOGIN_REGISTER.emailError);
            } else {
                setError('');
            }
        } else if (name === LOGIN_REGISTER.passwordName) {
            if (value.length < LOGIN_REGISTER.passwordMinLength || value.length > LOGIN_REGISTER.passwordMaxLength) {
                setError(LOGIN_REGISTER.passwordError);
            } else {
                setError('');
            }
        } else if (name === LOGIN_REGISTER.passwordRepeatName) {
            if (value.length < LOGIN_REGISTER.passwordMinLength || value.length > LOGIN_REGISTER.passwordMaxLength) {
                setError(LOGIN_REGISTER.passwordError);
            } else {
                setError('');
            }
        }
    }, []);

    return { error, setError, changeHandler };
};

export default useLoginRegisterChangeHandler;
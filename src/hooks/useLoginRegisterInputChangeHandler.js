import {
    EMAIL_NAME, PASSWORD_NAME, PASSWORD_REPEAT_NAME,
    PASSWORD_MIN_LENGTH, PASSWORD_MAX_LENGTH,
    EMAIL_ERROR, PASSWORD_ERROR
} from '../constants';

const useLoginRegisterInputChangeHandler = (setError) => {
    const inputChangeHandler = (e) => {
        const { name, value } = e.target;

        if (name === EMAIL_NAME) {
            if (value === '') {
                setError(EMAIL_ERROR);
            } else {
                setError('');
            }
        } else if (name === PASSWORD_NAME) {
            if (value.length < PASSWORD_MIN_LENGTH || value.length > PASSWORD_MAX_LENGTH) {
                setError(PASSWORD_ERROR);
            } else {
                setError('');
            }
        } else if (name === PASSWORD_REPEAT_NAME) {
            if (value.length < PASSWORD_MIN_LENGTH || value.length > PASSWORD_MAX_LENGTH) {
                setError(PASSWORD_ERROR);
            } else {
                setError('');
            }
        }
    };

    return inputChangeHandler;
};

export default useLoginRegisterInputChangeHandler;
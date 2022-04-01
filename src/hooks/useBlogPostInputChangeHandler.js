import {
    TITLE_NAME, CONTENT_NAME, IMAGE_URL_NAME,
    TITLE_MIN_LENGTH, TITLE_MAX_LENGTH, CONTENT_MIN_LENGTH, CONTENT_MAX_LENGTH, IMAGE_URL_REGEX,
    TITLE_ERROR, CONTENT_ERROR, IMAGE_URL_ERROR
} from '../constants';

const regexImageUrl = new RegExp(IMAGE_URL_REGEX);

const useBlogPostInputChangeHandler = (setErrors) => {
    const inputChangeHandler = (e) => {
        const { name, value } = e.target;

        if (name === TITLE_NAME) {
            if (value.length < TITLE_MIN_LENGTH || value.length > TITLE_MAX_LENGTH) {
                setErrors(state => ({ ...state, title: TITLE_ERROR }));
            } else {
                setErrors(state => ({ ...state, title: '' }));
            }
        } else if (name === CONTENT_NAME) {
            if (value.length < CONTENT_MIN_LENGTH || value.length > CONTENT_MAX_LENGTH) {
                setErrors(state => ({ ...state, content: CONTENT_ERROR }));
            } else {
                setErrors(state => ({ ...state, content: '' }));
            }
        } else if (name === IMAGE_URL_NAME) {
            if (!regexImageUrl.test(value)) {
                setErrors(state => ({ ...state, imageUrl: IMAGE_URL_ERROR }));
            } else {
                setErrors(state => ({ ...state, imageUrl: '' }));
            }
        }
    };

    return inputChangeHandler;
};

export default useBlogPostInputChangeHandler;
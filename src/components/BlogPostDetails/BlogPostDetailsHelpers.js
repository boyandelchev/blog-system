import {
    COMMENT_NAME,
    COMMENT_CONTENT_MIN_LENGTH, COMMENT_CONTENT_MAX_LENGTH,
    COMMENT_CONTENT_ERROR
} from './BlogPostDetailsConstants';

export const useCommentInputChangeHandler = (setError) => {
    const inputChangeHandler = (e) => {
        const { name, value } = e.target;

        if (name === COMMENT_NAME) {
            if (value.length < COMMENT_CONTENT_MIN_LENGTH || value.length > COMMENT_CONTENT_MAX_LENGTH) {
                setError(COMMENT_CONTENT_ERROR);
            } else {
                setError('');
            }
        }
    };

    return inputChangeHandler;
};
const WRONG_ERROR_TYPE = 'Wrong error type for form validation!'

const useValidateForm = () => {
    const validateForm = errors => {
        let valid = true;

        if (typeof errors === 'string') {
            errors.length > 0 && (valid = false);
        } else if (typeof errors === 'object') {
            Object.values(errors)
                .forEach(val => val.length > 0 && (valid = false));
        } else {
            console.log(WRONG_ERROR_TYPE);
            throw new Error(WRONG_ERROR_TYPE);
        }

        return valid;
    };

    return validateForm;
};

export default useValidateForm;
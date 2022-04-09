const validateForm = errors => {
    const wrongErrorType = 'Wrong error type for form validation!'

    let valid = true;

    if (typeof errors === 'string') {
        errors.length > 0 && (valid = false);
    } else if (typeof errors === 'object') {
        Object.values(errors)
            .forEach(val => val.length > 0 && (valid = false));
    } else {
        console.log(wrongErrorType);
        throw new Error(wrongErrorType);
    }

    return valid;
};

export default validateForm;
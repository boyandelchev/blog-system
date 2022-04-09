export const EMPTY_FORM_ERROR = 'Please fill in the form before submitting.';

export const LOGIN_REGISTER = {
    emailName: 'email',
    passwordName: 'password',
    passwordRepeatName: 'repeat-password',

    passwordMinLength: 6,
    passwordMaxLength: 100,

    emailError: 'Please fill in your email address.',
    passwordError: 'Password must be at least 6 characters long.',
    passwordsMismatchError: 'Passwords do not match.',
};

export const BLOG_POST = {
    titleName: 'blog-post-create-title',
    contentName: 'blog-post-create-content',
    imageURLName: 'blog-post-create-image-url',
    categoriesName: 'blog-post-create-categories',

    titleMinLength: 2,
    titleMaxLength: 100,
    contentMinLength: 10,
    contentMaxLength: 5000,
    imageURLRegex: '(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})',

    titleError: 'Title must be between 2 and 100 characters long.',
    contentError: 'Content must be between 10 and 5000 characters long. Please create part 2 if longer.',
    imageURLError: 'Please provide a proper URL.',
};
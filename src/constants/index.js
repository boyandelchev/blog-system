export const EMPTY_FORM_ERROR = 'Please fill in the form before submitting.';

// Login / Register
export const EMAIL_NAME = 'email';
export const PASSWORD_NAME = 'password';
export const PASSWORD_REPEAT_NAME = 'repeat-password';

export const PASSWORD_MIN_LENGTH = 6;
export const PASSWORD_MAX_LENGTH = 100;

export const EMAIL_ERROR = 'Please fill in your email address.';
export const PASSWORD_ERROR = 'Password must be at least 6 characters long.';
export const PASSWORDS_MISMATCH_ERROR = 'Passwords do not match.';

// Blog Post
export const TITLE_NAME = 'blog-post-create-title';
export const CONTENT_NAME = 'blog-post-create-content';
export const IMAGE_URL_NAME = 'blog-post-create-image-url';
export const CATEGORIES_NAME = 'blog-post-create-categories';

export const TITLE_MIN_LENGTH = 2;
export const TITLE_MAX_LENGTH = 100;
export const CONTENT_MIN_LENGTH = 10;
export const CONTENT_MAX_LENGTH = 5000;
export const IMAGE_URL_REGEX = '(https?://(?:www.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|www.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9].[^s]{2,}|https?://(?:www.|(?!www))[a-zA-Z0-9]+.[^s]{2,}|www.[a-zA-Z0-9]+.[^s]{2,})';

export const TITLE_ERROR = 'Title must be between 2 and 100 characters long.';
export const CONTENT_ERROR = 'Content must be between 10 and 5000 characters long. Please create part 2 if longer.';
export const IMAGE_URL_ERROR = 'Please provide a proper URL.';
const getAuthorNameFromUserEmail = (userEmail) => {
    let index = userEmail.indexOf('@');
    let authorName = userEmail;

    if (index !== -1) {
        authorName = authorName.at(0).toUpperCase() + authorName.substring(1, index);
    }

    return authorName;
};

export default getAuthorNameFromUserEmail;
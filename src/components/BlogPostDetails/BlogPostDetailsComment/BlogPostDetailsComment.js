const BlogPostDetailsComment = ({
    comment,
}) => {
    let date = new Date(comment._createdOn)
        .toString()
        .substring(0, 24);

    return (
        <div className="d-flex">
            <div className="flex-grow-1">
                <img className="me-3" src="/img/profile-image-32x32.png" alt="profile" />
                <span className="mt-0 font-weight-bold">{comment.authorName}</span>
                <span className="float-end text-secondary font-italic">{date}</span>
                <p>{comment.content}</p>
            </div>
        </div>
    );
};

export default BlogPostDetailsComment;
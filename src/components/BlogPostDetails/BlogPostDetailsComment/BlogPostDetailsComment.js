const BlogPostDetailsComment = ({
    comment,
}) => {
    let date = new Date(comment._createdOn)
        .toString()
        .substring(0, 24);

    return (
        <div className="media">
            <div className="media-body">
                <img className="mr-3" src="/img/profile-image-32x32.png" alt="profile" />
                <span className="mt-0 font-weight-bold">{comment.authorName}</span>
                <span className="float-right text-secondary font-italic">{date}</span>
                <p>{comment.content}</p>
            </div>
        </div>
    );
};

export default BlogPostDetailsComment;
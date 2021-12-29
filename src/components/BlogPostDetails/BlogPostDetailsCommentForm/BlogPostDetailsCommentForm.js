const BlogPostDetailsCommentForm = ({
    onBlogPostDetailsCommentForm,
}) => {
    return (
        <div className="text-center">
            <section className="mt-3">
                <form onSubmit={onBlogPostDetailsCommentForm} method="POST">
                    <div className="form-group">
                        <label htmlFor="commentContent">Let me know your views. Comment down below.</label>
                        <textarea name="commentContent" id="commentContent" rows="5" className="form-control" placeholder="Add a comment"></textarea>
                    </div>

                    <input className="btn btn-primary mt-3" type="submit" value="Add a comment" />
                </form>
            </section>
        </div>
    );
};

export default BlogPostDetailsCommentForm;
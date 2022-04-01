const BlogPostDetailsCommentForm = ({
    blogPostDetailsCommentFormHandler,
    inputChangeHandler,
}) => {
    return (
        <div className="text-center">
            <section>
                <form onSubmit={blogPostDetailsCommentFormHandler} method="POST">
                    <div>
                        <label htmlFor="commentContent" className="form-label">Let me know your views. Comment down below.</label>
                        <textarea name="commentContent" id="commentContent" rows="5" className="form-control" onChange={inputChangeHandler} placeholder="Add a comment"></textarea>
                    </div>

                    <input className="btn btn-primary mt-3" type="submit" value="Add a comment" />
                </form>
            </section>
        </div>
    );
};

export default BlogPostDetailsCommentForm;
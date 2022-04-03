import useDebounce from '../../../hooks/useDebounce';

const BlogPostDetailsCommentForm = ({
    blogPostDetailsCommentFormHandler,
    changeHandler,
    isDisabled,
}) => {
    const debounce = useDebounce();

    return (
        <div className="text-center">
            <section>
                <form onSubmit={blogPostDetailsCommentFormHandler} method="POST">
                    <div>
                        <label htmlFor="commentContent" className="form-label">Let me know your views. Comment down below.</label>
                        <textarea name="commentContent" id="commentContent" rows="5" className="form-control" onChange={debounce(changeHandler)} placeholder="Add a comment"></textarea>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3" disabled={isDisabled}>Add a comment</button>
                </form>
            </section>
        </div>
    );
};

export default BlogPostDetailsCommentForm;
import './ErrorPage.css';

const ErrorPage = ({
    children
}) => {
    return (
        <section className="error-page">
            <h1>Page does not exist</h1>
            {children && <p>{children}</p>}
        </section>
    );
};

export default ErrorPage;
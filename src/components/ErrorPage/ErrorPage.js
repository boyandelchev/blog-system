import './ErrorPage.css';

const ErrorPage = ({
    children
}) => {
    return (
        <section className="error-page">
            <h1>Page Not Found</h1>
            {children && <p className="no-content">{children}</p>}
        </section>
    );
}

export default ErrorPage;
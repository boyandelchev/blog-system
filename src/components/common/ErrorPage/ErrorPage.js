import './ErrorPage.css';

const ErrorPage = ({
    children
}) => {
    return (
        <section className="error-page">
            <h1>Error 404 Page Not Found</h1>
            {children && <p>{children}</p>}
        </section>
    );
};

export default ErrorPage;
import { Component } from 'react';

import './ErrorBoundary.css';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);

        this.state = {
            error: null
        };
    }

    static getDerivedStateFromError(error) {
        return { error };
    }

    componentDidCatch(error) {
        console.log(error);
    }

    render() {
        if (this.state.error) {
            return (
                <h1 className="error-boundary">Error 404 Page Not Found</h1>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
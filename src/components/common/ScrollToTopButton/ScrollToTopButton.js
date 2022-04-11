import { useState, useEffect, useCallback } from 'react';

import './ScrollToTopButton.css';

const ScrollToTopButton = () => {
    const height = 800;
    const [showTopButton, setShowTopButton] = useState(false);

    const checkScrollPosition = useCallback(() => {
        if (window.scrollY > height) {
            setShowTopButton(true);
        } else {
            setShowTopButton(false);
        }
    }, []);

    useEffect(() => {
        window.addEventListener('scroll', checkScrollPosition);

        return () => window.removeEventListener('scroll', checkScrollPosition);
    }, [checkScrollPosition]);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <>
            {showTopButton &&
                <button
                    className="scroll-to-top-button"
                    title="Go to top"
                    onClick={scrollToTop}>Top
                </button>
            }
        </>
    );
};

export default ScrollToTopButton;
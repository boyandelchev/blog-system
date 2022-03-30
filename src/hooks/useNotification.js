import { useState } from 'react';

import './useNotification.css';

const useNotification = (message, milliseconds) => {
    const [notification, setNotification] = useState(<p className="notification-hook">{message}</p>);

    const clearNotification = () => {
        setTimeout(() => {
            setNotification('');
        }, milliseconds);
    };

    return [notification, clearNotification];
};

export default useNotification;
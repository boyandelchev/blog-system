import { createContext, useState, useCallback } from 'react';

const notificationTypes = {
    error: 'danger',
    warning: 'warning',
    info: 'info',
    success: 'success',
};

const initialNotificationState = {
    show: false,
    message: '',
    type: notificationTypes.error,
};

export const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
    const timeout = 5000;
    const [notification, setNotification] = useState(initialNotificationState);

    const showNotification = useCallback((message, type) => {
        setNotification({ show: true, message, type });

        setTimeout(() => {
            setNotification(initialNotificationState);
        }, timeout);
    }, []);

    const showNotificationError = useCallback((message) => {
        showNotification(message, notificationTypes.error);
    }, [showNotification]);

    const showNotificationWarning = useCallback((message) => {
        showNotification(message, notificationTypes.warning);
    }, [showNotification]);

    const showNotificationInfo = useCallback((message) => {
        showNotification(message, notificationTypes.info);
    }, [showNotification]);

    const showNotificationSuccess = useCallback((message) => {
        showNotification(message, notificationTypes.success);
    }, [showNotification]);

    const hideNotification = useCallback(() => setNotification(initialNotificationState), []);

    return (
        <NotificationContext.Provider value={{
            notification,
            showNotificationError,
            showNotificationWarning,
            showNotificationInfo,
            showNotificationSuccess,
            hideNotification,
        }}>
            {children}
        </NotificationContext.Provider>
    );
};
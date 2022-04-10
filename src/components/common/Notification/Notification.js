import { useContext } from 'react';

import { NotificationContext } from '../../../contexts/NotificationContext';

import './Notification.css';
import { Toast } from 'react-bootstrap';

const Notification = () => {
    const { notification, hideNotification } = useContext(NotificationContext);

    if (!notification.show) {
        return null;
    }

    return (
        <div className="container notification-parent">
            <Toast className="d-inline-block m-1 notification" bg={notification.type} onClose={hideNotification}>
                <Toast.Header>
                    <strong className="me-auto">Close</strong>
                </Toast.Header>
                <Toast.Body className="text-white fw-bold">
                    {notification.message}
                </Toast.Body>
            </Toast>
        </div>
    );
};

export default Notification;
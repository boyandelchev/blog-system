import { useState } from 'react';

import Notification from '../components/Common/Notification';

const useNotification = (message, milliseconds = 3000) => {
    const [notification, setNotification] = useState(<Notification message={message} />);

    const clearNotification = () => {
        setTimeout(() => {
            setNotification('');
        }, milliseconds);
    };

    return [notification, clearNotification];
};

export default useNotification;
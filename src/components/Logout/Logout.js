import { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import * as authService from '../../services/authService';
import { AuthContext } from '../../contexts/AuthContext';
import { NotificationContext } from '../../contexts/NotificationContext';

const Logout = () => {
    const notificationMessage = 'You have successfully logged out.';
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const { showNotificationSuccess } = useContext(NotificationContext);

    useEffect(() => {
        authService.logout()
            .then(() => {
                logout();
                showNotificationSuccess(notificationMessage);
                navigate('/login');
            })
            .catch(err => {
                console.log(err.message);
            });
    }, [logout, navigate, showNotificationSuccess]);


    return null;
};

export default Logout;
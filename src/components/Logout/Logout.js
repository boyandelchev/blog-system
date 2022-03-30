import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import * as authService from '../../services/authService';
import { AuthContext } from '../../contexts/AuthContext';

const Logout = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const [notification, setNotification] = useState({ message: 'You have successfully logged out.', timeOut: 5000 });

    useEffect(() => {
        authService.logout(user.accessToken)
            .then(() => {
                logout();

                navigate('/login', { state: notification });
            });
    }, []);

    return null;
};

export default Logout;
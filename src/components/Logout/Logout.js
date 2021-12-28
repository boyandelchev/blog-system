import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { AuthContext } from '../../contexts/AuthContext';
import * as authService from '../../services/authService';

const Logout = () => {
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [notification, setNotification] = useState({ message: 'You are successfully logged out.', timeOut: 5000 });

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
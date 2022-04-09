import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import * as authService from '../../services/authService';
import { AuthContext } from '../../contexts/AuthContext';

const Logout = () => {
    const navigate = useNavigate();
    const { user, logout } = useContext(AuthContext);
    const [notification] = useState({ message: 'You have successfully logged out.', timeOut: 3000 });

    useEffect(() => {
        authService.logout(user.accessToken)
            .then(() => {
                logout();

                navigate('/login', { state: notification });
            });
    }, [logout, navigate, notification, user.accessToken]);

    return null;
};

export default Logout;
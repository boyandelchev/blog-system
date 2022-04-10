import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';

import * as authService from '../../services/authService';
import { AuthContext } from '../../contexts/AuthContext';

const Logout = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext);
    const [notification] = useState({ message: 'You have successfully logged out.', timeOut: 3000 });

    useEffect(() => {
        authService.logout()
            .then(() => {
                logout();

                navigate('/login', { state: notification });
            })
            .catch(err => {
                console.log(err.message);
            });
    }, [logout, navigate, notification]);


    return null;
};

export default Logout;
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { logoutUser } from '../../services/AuthService';

const Logout: React.FC = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const handleLogout = async () => {
            await logoutUser();
            navigate('/login');
        };

        handleLogout();
    }, [navigate]);

    return <div>Déconnexion...</div>;
};

export default Logout;

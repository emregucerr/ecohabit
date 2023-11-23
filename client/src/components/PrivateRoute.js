import React from 'react';
import { useUserContext } from '../contexts/UserContext.js';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children }) => {
    const { user } = useUserContext();
    
    if (!user) {
        return <Navigate to='/login' replace />;
    }
    
    return children;
};

export default PrivateRoute;

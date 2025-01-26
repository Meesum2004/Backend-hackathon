
import React from 'react';
import { useAuthentication } from '../context/AuthContext';
import { Navigate, Outlet } from 'react-router-dom';

const UserRoute = () => {
    const { user } = useAuthentication();
    return (
        <>
            {user.token ? <Outlet /> : <Navigate to="/signIn" />} {/* Redirect if not authenticated */}
        </>
    );
};

export default UserRoute;


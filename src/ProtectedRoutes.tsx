import React from "react";
import { useSelector } from "react-redux";

import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "./app/store";

const ProtectedRoutes: React.FC = () => {
    const { isValid, user } = useSelector((state: RootState) => state.auth);

    return isValid && user ? <Outlet /> : <Navigate to='/login' />;
};

export default ProtectedRoutes;

import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoutesFilterComponent = ({ permissionKey, route: RouteComponent }) => {

    const { userInfo } = useSelector((state) => state.userRegisterLogin);

    const hasAccess = userInfo && (userInfo.isSuperAdmin || userInfo[permissionKey]);
  
    return hasAccess ? <RouteComponent /> : <Navigate to="/admin/products" replace />;
  };

export default ProtectedRoutesFilterComponent;

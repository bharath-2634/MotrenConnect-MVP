import React from 'react'
import { Navigate, useLocation } from 'react-router-dom';

const CheckAuth = ({ isAuthenticated, user, children }) => {


    const location = useLocation();

    if(location.pathname==="/") {
        if(!isAuthenticated) {
            return <Navigate to="/auth/login"/>
        }else {
          if(location.pathname.includes("/register")) {
            return <Navigate to="/auth/getStarted"/>
          }else {
            return <Navigate to="/main/home"/>
          }
            
        }
    }

    if(isAuthenticated && (location.pathname.includes("/register"))) {
      return <Navigate to="/auth/getStarted"/>
    }

    if (
        !isAuthenticated &&
        !(
          location.pathname.includes("/login") ||
          location.pathname.includes("/register")
        )
      ) {
        return <Navigate to="/auth/login" />;
      }
    if(isAuthenticated && (location.pathname.includes("/register"))) {
        return <Navigate to="/auth/getStarted"/>
      }
      

      if (
        isAuthenticated &&
        (location.pathname.includes("/login") ||
          location.pathname.includes("/register"))
      ) {
        return <Navigate to="/main/home"/>
      }

      
  return <>{children}</>
}

export default CheckAuth;
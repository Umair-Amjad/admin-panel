import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoute = ({
  isAuthenticated,
  children,

  redirect = "/login",
}) => {
  if (!isAuthenticated) {
    return <Navigate to={redirect} />;
  }

  return children ? children : <Outlet />;
};

export default PrivateRoute;

// import { useState } from 'react';
// import { Navigate, useLocation } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import Login from '../authentication/Login';
// import { useSelector } from 'react-redux';

// const PrivateRoute = (props) => {
//     const { children } = props;
//     const location = useLocation();
//     const [requestedLocation, setRequestedLocation] = useState(null);
//     const { isLoggedIn } = useSelector((state) => state.auth);
//     console.log(isLoggedIn);
//     if (!isLoggedIn) {
//         if (location.pathname !== requestedLocation) {
//             setRequestedLocation(location.pathname);
//         }

//         return <Login />;
//     }

//     // This is done so that in case the route changes by any chance through other
//     // means between the moment of request and the render we navigate to the initially
//     // requested route.
//     if (requestedLocation && location.pathname !== requestedLocation) {
//         setRequestedLocation(null);
//         // console.log("requestedLocation", requestedLocation, "location", location.pathname);
//         return <Navigate to="/table" />;
//     }

//     return <>{children}</>;
// };

// PrivateRoute.propTypes = {
//     children: PropTypes.node
// };

// export default PrivateRoute;

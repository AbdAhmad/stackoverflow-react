import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
// import jwt_decode from "jwt-decode";
import AuthContext from '../context/AuthContext'


const PrivateRoute = ({children}) => {

    const {user} = useContext(AuthContext)

    // const user = localStorage.getItem('authTokens') ? jwt_decode(localStorage.getItem('authTokens')) : null

    return user ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
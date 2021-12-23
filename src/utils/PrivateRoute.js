import { Navigate } from 'react-router-dom'
import React, { useContext } from 'react'
import AuthContext from '../context/AuthContext'
import QuestionsPage from '../pages/QuestionsPage'

const PrivateRoute = ({children}) => {
    let {user} = useContext(AuthContext)
    return user ? <QuestionsPage/> : <Navigate to="/login" />;
}

export default PrivateRoute;
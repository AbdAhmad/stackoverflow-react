import React, {useContext} from 'react'
import { Link, } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { Button } from 'react-bootstrap'

const LogoutButton = () => {

    const { logoutUser } = useContext(AuthContext)

    return (
        <Link className="nav-link" to="/login"><Button onClick={logoutUser} variant='outline-primary'>Log out</Button></Link>
    )
}

export default LogoutButton

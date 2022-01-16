import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import { Button } from 'react-bootstrap'

const UserButton = () => {

    const { user } = useContext(AuthContext)

    return (
        <Link className="nav-link" to={`/profile/${user['username']}`}><Button variant='success'>{user['username']}</Button></Link>
    )
}

export default UserButton

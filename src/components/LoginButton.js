import React from 'react'
import { Link, } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const LoginButton = () => {
    return (
        <Link className="nav-link" to="/login"><Button variant='primary'>Log In</Button></Link>
    )
}

export default LoginButton

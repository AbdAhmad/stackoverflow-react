import React from 'react'
import { Link, } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const SignupButton = () => {
    return (
        <Link className="nav-link" to="/signup"><Button variant='success'>Sign up</Button></Link>
    )
}

export default SignupButton

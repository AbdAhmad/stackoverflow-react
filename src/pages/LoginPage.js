import React, {useContext} from 'react'
import { Card, Form, Button, Alert, Container } from 'react-bootstrap'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

import '../App.css'

const LoginPage = () => {
    
    const { loginUser, 
            user, 
            show, 
            alertType, 
            alertMsg, 
            setShow } = useContext(AuthContext)

    const navigate = useNavigate()

    document.title = 'Log in'

    if(user){
        navigate('/questions')
    }

    const handleClick = (e) => {
        loginUser(e)
    }


    return (
        <Container>
            { show ?

            <Alert variant={alertType} onClose={() => setShow(false)} dismissible>{alertMsg}</Alert>
            : 
            null
            }
      
            <Card>
                <Card.Body>
                    <Card.Title><h4>Log in</h4></Card.Title>
                    <br/>
                    <Card.Text>

                    {/* Login Form */}

                    <Form onSubmit={handleClick}>

                    {/* Username Field */}

                        <Form.Group className="mb-4">
                            <Form.Control name="username" type="text" placeholder="Username" required />
                        </Form.Group>

                    {/* Password Field */}

                        <Form.Group className="mb-4">
                            <Form.Control name="password" type="password" placeholder="Password" required />
                        </Form.Group>

                    {/* Login Button */}

                        <div className="d-grid gap-2">
                            <Button type="submit" variant="outline-primary" size="lg">
                                Log in
                            </Button>
                        </div>
                    </Form>
                    </Card.Text>
                    Don't have an account? <Card.Link style={{textDecoration: "none"}} href="/">Sign up</Card.Link>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default LoginPage

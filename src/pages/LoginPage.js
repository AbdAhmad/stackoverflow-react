import React, {useContext, useState} from 'react'
import { Card, Form, Button, Alert, Container } from 'react-bootstrap'
import AuthContext from '../context/AuthContext'
import { useNavigate, Link } from 'react-router-dom'

import Loader from '../components/Loader'

import '../App.css'

const LoginPage = () => {
    
    const { loginUser, 
            user, 
            show, 
            alertType, 
            alertMsg, 
            setShow,
            setAlertType,
            setAlertMsg,
            baseUrl,
            handleVisibility } = useContext(AuthContext)

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    document.title = 'Log in'

    if(user){
        navigate('/questions')
    }

    const checkCredentials = async (e) => {
        e.preventDefault()
        const response = await fetch(`${baseUrl}/check_credentials/`,{
            method: 'POST',
            headers: {
                "Content-type": "application/json"
            },
            body:JSON.stringify({'username':e.target.username.value, 'password':e.target.password.value})
        })
        if(response.status === 404){
            setLoading(false)
            setAlertType('danger')
            setAlertMsg('Wrong credentials')
            handleVisibility()
        }
        else if(response.status === 200){
            loginUser(e)
        }
    }

    const handleClick = (e) => {
        setLoading(true)
        checkCredentials(e)
    }


    return (
        <Container>
            { loading ? 
            <Loader/>
            :
            <>
            { show ?

            <Alert variant={alertType} className='text-center' onClose={() => setShow(false)} dismissible>{alertMsg}</Alert>
            : 
            null
            }

            <Card>
                <Card.Body>
                    <Card.Title className='text-center'><h4>Log in</h4></Card.Title>
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
                    <div className='text-center'>Don't have an account? <Link style={{textDecoration: "none"}} to="/signup">Sign up</Link></div>
                </Card.Body>
            </Card>
            </>
            }
        </Container>
    )
}

export default LoginPage

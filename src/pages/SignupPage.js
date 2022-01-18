import {React, useState, useContext} from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

import '../App.css'

const SignupPage = () => {

    const { user, 
            loginUser, 
            alertMsg, 
            alertType, 
            setAlertMsg, 
            setAlertType, 
            show, 
            setShow, 
            handleVisibility, 
            baseUrl } = useContext(AuthContext)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const navigate = useNavigate()

    if(user){
        navigate('/questions')
    }

    document.title = 'Sign up'

    const signUp = async (e) => {
        e.preventDefault()
        const response = await fetch(`${baseUrl}/register/`,{
            method: "POST",
            headers: {
                "Content-type": "application/json"
            },
            body: JSON.stringify({
                "username": username,
                "password": password,
                "confirmPassword": confirmPassword
            }),
        })

        if(response.status === 400){
            const data = await response.json()
            setAlertType('danger')
            if (data['username']){
                setAlertMsg(data['username'][0])
            }else if(data['non_field_errors']){
                setAlertMsg(data['non_field_errors'][0])
            }
            handleVisibility()
        }else{
            loginUser(e)
        }

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
                    <Card.Title className='title'><h4>Sign up</h4></Card.Title>
                    <br/>
                    <Card.Text>
                        <Form onSubmit={signUp}>
                            <Form.Group className="mb-4">
                                <Form.Control name='username' onChange={e => setUsername(e.target.value)} type="text" placeholder="Username" required />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Control name='password' onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Control name='confirmPassword' onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" required />
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button variant="outline-primary" type="submit" size="lg">Sign up</Button>
                            </div>
                        </Form>
                    </Card.Text>
                    Already have an account? <Card.Link style={{textDecoration: "none"}} href="login">Log in</Card.Link>
                </Card.Body>
            </Card>
        </Container>
    )
}

export default SignupPage
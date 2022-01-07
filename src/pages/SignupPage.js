import {React, useState, useContext, useEffect} from 'react'
import { Form, Button, Card, Alert } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const SignupPage = () => {

    const {user} = useContext(AuthContext)

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [show, setShow] = useState(false);
    const [alertType, setAlertType] = useState('')
    const [alertMsg, setAlertMsg] = useState('')

    const navigate = useNavigate()

    useEffect(() => {
        if(user){
            navigate('/questions')
        }

    })


    const handleSubmit = e => {
        e.preventDefault()
        signUp() 
    }

    const handleVisibility = () => {
        setShow(true)
        setTimeout(() => {
            setShow(false)
        }, 3000);
    }

    const signUp = async () => {
        const response = await fetch('http://localhost:8000/register/',{
            method: "POST",
            body: JSON.stringify({
                username: username,
                password: password,
                confirmPassword: confirmPassword
            }),
            headers: {
                "Content-type": "application/json"
            }
        })
        const data = await response.json()
        if(response.status === 400){
            setAlertType('danger')
            if (data['username']){
                setAlertMsg(data['username'][0])
            }else if(data['non_field_errors']){
                setAlertMsg(data['non_field_errors'][0])
            }
            handleVisibility()
        }else{
            navigate('/login')
        }
        
    }

    return (
        <div>
            { show ?

                <Alert variant={alertType} onClose={() => setShow(false)} dismissible>{alertMsg}</Alert>
                : 
                null
            }
            <Card style={{width: "90%", marginLeft: "5%"}}>
                <Card.Body>
                    <Card.Title><h4>Sign up</h4></Card.Title>
                    <br/>
                    <Card.Text>
                        <Form onSubmit={handleSubmit}>
                            <Form.Group className="mb-4">
                                <Form.Control onChange={e => setUsername(e.target.value)} type="text" placeholder="Username" required />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Control onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" required />
                            </Form.Group>
                            <Form.Group className="mb-4">
                                <Form.Control onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" required />
                            </Form.Group>
                            <div className="d-grid gap-2">
                                <Button variant="outline-primary" type="submit" size="lg">Sign up</Button>
                            </div>
                        </Form>
                    </Card.Text>
                    Already have an account? <Card.Link style={{textDecoration: "none"}} href="login">Log in</Card.Link>
                </Card.Body>
            </Card>
        </div>
    )
}

export default SignupPage
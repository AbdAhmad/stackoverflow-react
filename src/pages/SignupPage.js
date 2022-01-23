import React, {useState, useContext} from 'react'
import { Form, Button, Card, Alert, Container } from 'react-bootstrap'
import { useNavigate, Link } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

import Loader from '../components/Loader'

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

    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    if(user){
        navigate('/questions')
    }

    document.title = 'Sign up'

    const signUp = async (e) => {
        e.preventDefault()
        setLoading(true)
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
            setLoading(false)
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
        { loading ?
            <Loader/>
        :
        <React.Fragment>
            { show ?

            <Alert variant={alertType} className='text-center' onClose={() => setShow(false)} dismissible>{alertMsg}</Alert>
            : 
            null
            }
            <Card>
            <Card.Body>
                <Card.Title className='text-center'><h4>Sign up</h4></Card.Title>
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
                <div className='text-center'>Already have an account? <Link style={{textDecoration: "none"}} to="/login">Log in</Link></div>
            </Card.Body>
            </Card>
        </React.Fragment>
        }
        </Container>
    )
}

export default SignupPage
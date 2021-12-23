import {React, useState} from 'react'
import { Form, Button, Card } from 'react-bootstrap'

const SignupPage = () => {

    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")


    const handleSubmit = e => {
        e.preventDefault()
        signUp() 
    }

    const signUp = async () => {
        let response = await fetch('http://localhost:8000/register/',{
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

        let data = await response.json()
        console.log(data)
    }

    return (
        <div>
            <Card style={{width: "90%", marginLeft: "5%"}}>
            <Card.Body>
                <Card.Title><h4>Sign up</h4></Card.Title>
                <br/>
                <Card.Text>
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-4">
                    <Form.Control onChange={e => setUsername(e.target.value)} type="text" placeholder="Username" />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Control onChange={e => setPassword(e.target.value)} type="password" placeholder="Password" />
                </Form.Group>
                <Form.Group className="mb-4">
                    <Form.Control onChange={e => setConfirmPassword(e.target.value)} type="password" placeholder="Confirm Password" />
                </Form.Group>
                <div className="d-grid gap-2">
                <Button variant="outline-primary" type="submit" size="lg">
                    Sign up
                </Button>
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
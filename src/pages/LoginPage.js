import React, {useContext} from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import AuthContext from '../context/AuthContext'

const LoginPage = () => {
    let {loginUser} = useContext(AuthContext)

    return (
        <div>
            <Card style={{width: "90%", marginLeft: "5%"}}>
                <Card.Body>
                    <Card.Title><h4>Log in</h4></Card.Title>
                    <br/>
                    <Card.Text>
                    <Form onSubmit={loginUser}>
                        <Form.Group className="mb-4">
                            <Form.Control name="username" type="text" placeholder="Username" />
                        </Form.Group>
                        <Form.Group className="mb-4">
                            <Form.Control name="password" type="password" placeholder="Password" />
                        </Form.Group>
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
        </div>
    )
}

export default LoginPage

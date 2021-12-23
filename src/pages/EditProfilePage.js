import React, {useContext, useState} from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import AuthContext from '../context/AuthContext'

const EditProfilePage = () => {

    const {user, authTokens} = useContext(AuthContext)


    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [location, setLocation] = useState('')
    const [bio, setBio] = useState('')

    const handleSubmit = async(e) => {
        e.preventDefault()
        const response = await fetch('http://127.0.0.1:8000/profile/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
         
            body:JSON.stringify({'user': user['user_id'], 'name':fullName, 'email':email, 'location':location, 'bio':bio})
        })
        console.log(user['user_id']);
        const data = response.json();
        console.log(data)
        
    }

    return (
        <>
            <Card style={{width: "90%", marginLeft: "5%"}}>
            <br/>
            <Card.Title><h3>Complete Your Profile</h3></Card.Title>
            <br/>
            <Form onSubmit={handleSubmit}>
                <Form.Group style={{padding: "10px"}} className="mb-3">
                    <Form.Control type="text" onChange={e => setFullName(e.target.value)} placeholder="Full Name" />
                </Form.Group>
                <Form.Group style={{padding: "10px"}} className="mb-3">
                    <Form.Control type="email" onChange={e => setEmail(e.target.value)} placeholder="Email" />
                </Form.Group>
                <Form.Group style={{padding: "10px"}} className="mb-3">
                    <Form.Control type="text" onChange={e => setLocation(e.target.value)} placeholder="Location" />
                </Form.Group>
                <Form.Group style={{padding: "10px"}} className="mb-3">
                    <Form.Control placeholder="About me" onChange={e => setBio(e.target.value)} as="textarea" rows={4} />
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="outline-primary" type='submit' size="lg">Save</Button>
                </div>
            </Form>
            </Card>
        </>
    )
}

export default EditProfilePage
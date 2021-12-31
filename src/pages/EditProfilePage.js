import React, {useContext, useEffect, useState} from 'react'
import { Card, Form, Button } from 'react-bootstrap'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

const EditProfilePage = () => {

    const {user, authTokens} = useContext(AuthContext)
    
    const navigate = useNavigate()

    const [update, setUpdate] = useState(false)

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [location, setLocation] = useState('')
    const [bio, setBio] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        if(update){
            updateProfile()
        }else{
            createProfile()
        }
    }

 
    const createProfile = async () => {
        console.log('create')
        const response = await fetch('http://127.0.0.1:8000/profile/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
            body:JSON.stringify({'full_name':fullName, 'email':email, 'location':location, 'bio':bio})
        })
        const data = await response.json();
        console.log(data)
        navigate(`/profile/${user['username']}`)
    }


    const updateProfile = async () => {
        console.log('update')
        const response = await fetch(`http://127.0.0.1:8000/profile/${user['username']}/`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
            
            body:JSON.stringify({'full_name':fullName, 'email':email, 'location':location, 'bio':bio})
        })
        const data = await response.json();
        console.log(data)
        navigate(`/profile/${user['username']}`)
    }


    const getProfile = async () => {
        const response = await fetch(`http://127.0.0.1:8000/profile/${user['username']}`, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },            
        })
        if(response.status == 200){
            setUpdate(true)
        }
        const data = await response.json();
        console.log(data)
        setFullName(data['profile'].full_name)
        setEmail(data['profile'].email)
        setLocation(data['profile'].location)
        setBio(data['profile'].bio)
    }


    useEffect(() => {
        getProfile()
    }, [])


    return (
        <>
            <Card style={{width: "90%", marginLeft: "5%"}}>
            <br/>
            <Card.Title><h3>Complete Your Profile</h3></Card.Title>
            <br/>
            <Form onSubmit={handleSubmit}>
                <Form.Group style={{padding: "10px"}} className="mb-3">
                    <Form.Control type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full Name" />
                </Form.Group>
                <Form.Group style={{padding: "10px"}} className="mb-3">
                    <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                </Form.Group>
                <Form.Group style={{padding: "10px"}} className="mb-3">
                    <Form.Control type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" />
                </Form.Group>
                <Form.Group style={{padding: "10px"}} className="mb-3">
                    <Form.Control placeholder="About me" value={bio} onChange={e => setBio(e.target.value)} as="textarea" rows={4} />
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
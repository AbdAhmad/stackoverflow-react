import React, {useContext, useEffect, useState} from 'react'
import { Card, Form, Button, Container } from 'react-bootstrap'
import AuthContext from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

import '../App.css'
import '../css/editProfilePage.css'

const EditProfilePage = () => {

    const {user, authTokens, setAlertType, setAlertMsg, handleVisibility} = useContext(AuthContext)
    
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
        const response = await fetch('http://127.0.0.1:8000/profile/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
            body:JSON.stringify({'full_name':fullName, 'email':email, 'location':location, 'bio':bio})
        })
        if(response.status === 200){
            setAlertType('success')
            setAlertMsg('Profile updated')
            handleVisibility()
        }
        navigate(`/profile/${user['username']}`)
    }


    const updateProfile = async () => {
        const response = await fetch(`http://127.0.0.1:8000/profile/${user['username']}/`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
            
            body:JSON.stringify({'full_name':fullName, 'email':email, 'location':location, 'bio':bio})
        })
        if(response.status === 200){
            setAlertType('success')
            setAlertMsg('Profile updated')
            handleVisibility()
        }
        navigate(`/profile/${user['username']}`)
    }


    const getProfile = async () => {
        const response = await fetch(`http://127.0.0.1:8000/profile/${user['username']}`, {
            headers:{
                'Authorization': `Bearer ${authTokens?.access}`
            },            
        })
        if(response.status === 200){
            setUpdate(true)
        }
        const data = await response.json();
        setFullName(data['profile'].full_name)
        setEmail(data['profile'].email)
        setLocation(data['profile'].location)
        setBio(data['profile'].bio)
    }


    useEffect(() => {
        getProfile()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Container>
            
                <br/>
                <Card.Title><h3>Complete Your Profile</h3></Card.Title>
                <br/>
                <Form onSubmit={handleSubmit}>

                {/* Full Name Field */}

                    <Form.Group className="mb-3">
                        <Form.Control type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full Name" />
                    </Form.Group>

                {/* Email Field */}

                    <Form.Group className="mb-3">
                        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" />
                    </Form.Group>

                {/* Location Field */}

                    <Form.Group className="mb-3">
                        <Form.Control type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" />
                    </Form.Group>

                {/* Bio Field */}

                    <Form.Group className="mb-3">
                        <Form.Control placeholder="About me" value={bio} onChange={e => setBio(e.target.value)} as="textarea" rows={4} />
                    </Form.Group>

                {/* Submit Button */}

                    <div className="d-grid gap-2">
                        <Button variant="outline-primary" type='submit' size="lg">Save</Button>
                    </div>
                </Form>
            
        </Container>
    )
}

export default EditProfilePage
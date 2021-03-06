import React, {useContext, useEffect, useState} from 'react'
import { Card, Form, Button, Container } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

import AuthContext from '../context/AuthContext'
import useAxios from '../utils/useAxios'

import '../App.css'
import '../css/editProfilePage.css'

import Loader from '../components/Loader'

const EditProfilePage = () => {

    const { user, 
            setAlertType, 
            setAlertMsg, 
            handleVisibility,
            baseUrl } = useContext(AuthContext)
    
    const navigate = useNavigate()

    const api = useAxios()

    const [update, setUpdate] = useState(false)

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [location, setLocation] = useState('')
    const [bio, setBio] = useState('')

    const [loading, setLoading] = useState(true)

    document.title = 'Update Your Profile'

    const handleSubmit = e => {
        e.preventDefault()
        setLoading(true)
        if(update){
            updateProfile()
        }else{
            createProfile()
        }
    }

 
    const createProfile = async () => {

        const formData = JSON.stringify({'full_name':fullName, 'email':email, 'location':location, 'bio':bio})
        const response = await api.post(`${baseUrl}/profile/`, formData, {
            headers:{
                'Content-Type': 'application/json',
            },
        })

        if(response.status === 200){
            setLoading(false)
            setAlertType('success')
            setAlertMsg('Profile updated')
            handleVisibility()
        }
        navigate(`/profile/${user['username']}`)
    }


    const updateProfile = async () => {
      
        const formData = JSON.stringify({'full_name':fullName, 'email':email, 'location':location, 'bio':bio})
        const response = await api.put(`${baseUrl}/profile/${user['username']}/`, formData, {
            headers:{
                'Content-Type': 'application/json',
            },
        })

        if(response.status === 200){
            setLoading(false)
            setAlertType('success')
            setAlertMsg('Profile updated')
            handleVisibility()
        }
        setLoading(false)
        navigate(`/profile/${user['username']}`)
    }


    const getProfile = async () => {
        const response = await api.get(`${baseUrl}/profile/${user['username']}/`)
        if(response.status === 200){
            setUpdate(true)
        }
        const data = await response['data']
        setFullName(data['profile'].full_name)
        setEmail(data['profile'].email)
        setLocation(data['profile'].location)
        setBio(data['profile'].bio)

        setLoading(false)
    }


    useEffect(() => {
        getProfile()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (
        <Container>
            { loading ?
                <Loader/>
                :
            <React.Fragment>
                <Card>
                <br/>
                <Card.Title className='text-center'><h3>Complete Your Profile</h3></Card.Title>
                <br/>
                <Form onSubmit={handleSubmit}>

                {/* Full Name Field */}

                    <Form.Group className="mb-3">
                        <Form.Control type="text" value={fullName} onChange={e => setFullName(e.target.value)} placeholder="Full Name" required />
                    </Form.Group>

                {/* Email Field */}

                    <Form.Group className="mb-3">
                        <Form.Control type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required />
                    </Form.Group>

                {/* Location Field */}

                    <Form.Group className="mb-3">
                        <Form.Control type="text" value={location} onChange={e => setLocation(e.target.value)} placeholder="Location" required />
                    </Form.Group>

                {/* Bio Field */}

                    <Form.Group className="mb-3">
                        <Form.Control placeholder="About me" value={bio} onChange={e => setBio(e.target.value)} as="textarea" rows={4} required />
                    </Form.Group>

                {/* Submit Button */}

                    <div className="d-grid gap-2">
                        <Button variant="outline-primary" type='submit' size="lg">Save</Button>
                    </div>
                </Form>
            </Card>
            </React.Fragment>
            }
        </Container>
    )
}

export default EditProfilePage
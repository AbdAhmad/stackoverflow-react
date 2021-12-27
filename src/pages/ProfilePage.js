import React, { useContext, useEffect, useState} from 'react'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import { Link, useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const ProfilePage = () => {

    const {user, authTokens} = useContext(AuthContext)

    let {username} = useParams()

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [location, setLocation] = useState('')
    const [bio, setBio] = useState('')

    const profileInfoStyle = {
        fontSize: "20px", 
        fontStyle: "italic"
    }

    const getProfile = async () => {
        const response = await fetch(`http://127.0.0.1:8000/profile/${username}`, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        const data = await response.json();
        console.log(data)
        setFullName(data['full_name'])
        setEmail(data['email'])
        setLocation(data['location'])
        setBio(data['bio'])
    }

    useEffect(() => {
        getProfile()
    }, [])



    return (
        <>
            <Card style={{width: "90%", marginLeft: "5%"}}>
            <Card.Body>
                <Card.Title><h3><i>{fullName ? fullName: "This user has no Full Name"}</i></h3></Card.Title>
                <br/>
                <Card.Text >
                <p style={{display: "flex"}} className="card-text"><i style={profileInfoStyle} className="fa fa-envelope profile_info"> {email ? email : "Email not available"}</i></p>
                <p style={{display: "flex"}} className="card-text"><i style={profileInfoStyle} className="fa fa-map-marker profile_info"> {location ? location : "Location not available"}</i></p>
                <p style={{display: "flex"}} className="card-text"><i style={profileInfoStyle} className="fa fa-info-circle profile_info"> {bio ? bio: "Bio not available"}</i></p>
                </Card.Text>
                <br/>
                
                {
                    username === user['username'] ?
                        <Link style={{textDecoration: "none"}} to='/edit_profile'>
                        <div className="d-grid gap-2">
                        <Button variant="outline-secondary" size="lg">
                            <i >Complete Your Profile</i>
                        </Button>
                        </div>
                        </Link>
                        : null
                }

            </Card.Body>
            <br/>
            <Container>
                <Row>
                    <Col>
                    <h5>2 Questions</h5>
                    error: the following arguments are required: -a/--az, -m/--model
                    </Col>
                    <Col>
                    <h5>1 Answer</h5>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </Col>
                </Row>
            </Container>
            </Card>
        </>
    )
}

export default ProfilePage
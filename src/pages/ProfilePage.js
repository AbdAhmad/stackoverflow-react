import React from 'react'
import { Card, Button, Container, Row, Col } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const ProfilePage = () => {

    const profileInfoStyle = {
        fontSize: "20px", 
        fontStyle: "italic"
    }

    return (
        <>
            <Card style={{width: "90%", marginLeft: "5%"}}>
            <Card.Body>
                <Card.Title><h3><i>Abdulla Ahmad</i></h3></Card.Title>
                <br/>
                <Card.Text >
                <p style={{display: "flex"}} className="card-text"><i style={profileInfoStyle} className="fa fa-envelope profile_info"> admin@admin.com</i></p>
                <p style={{display: "flex"}} className="card-text"><i style={profileInfoStyle} className="fa fa-map-marker profile_info"> USA</i></p>
                <p style={{display: "flex"}} className="card-text"><i style={profileInfoStyle} className="fa fa-info-circle profile_info"> Apparently, this user prefers to keep an air of mystery about them.</i></p>
                </Card.Text>
                <br/>
                <Link style={{textDecoration: "none"}} to='/edit_profile'>
                <div className="d-grid gap-2">
                <Button variant="outline-secondary" size="lg">
                    <i >Complete Your Profile</i>
                </Button>
                </div>
                </Link>
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
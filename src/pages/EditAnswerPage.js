import React from 'react'
import { Row, Col, Button, Form, Container  } from 'react-bootstrap'
import UpVoteTri from '../components/UpVoteTri'
import DownVoteTri from '../components/DownVoteTri'
import { Link } from 'react-router-dom'

const EditAnswerPage = () => {

    return (
        <Container>
            <h2 style={{display: "flex"}}>Iterating through a series using an if loop to sort data into different buckets</h2>
            <p style={{display: "flex"}} class="p-2">Asked Nov 1, 2021, 4:38 p.m. Viewed 321 times</p>
            <hr/>
            <Row>
                <Col xs={2}>
                    <div style={{flex: "0.1", display: "flex"}}>
                        <div>
                            <UpVoteTri login={'login'} />
                            <div style={{width: "100%", textAlign: "center"}} className="pt-1 pb-1">0</div>
                            <DownVoteTri signup={'signup'} />
                        </div>
                    </div>
                </Col>
                <Col xs={10}>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.</p>
                </Col>
            </Row>
            <Row>
                <Col>
                    <div style={{display: "flex"}}>
                        <button style={{marginLeft: "1px"}} className="btn-block btn btn-outline-primary btn-sm">Python</button>
                        <button style={{marginLeft: "1px"}} className="btn-block btn btn-outline-primary btn-sm">Javascript</button>
                        <button style={{marginLeft: "1px"}} className="btn-block btn btn-outline-primary btn-sm">Django</button>
                    </div>
                </Col>
                <Col>
                    <div style={{float: "right", paddingRight: "2%"}}>
                        <small>Asked on <strong> 29 Aug by <Link style={{textDecoration: "none"}} to="#">Abdulla</Link></strong></small>
                    </div>
                </Col>
            </Row>
            <hr/>
            <Form.Group style={{padding: "10px"}} className="mb-3">
                <Form.Control placeholder="Your Answer" as="textarea" rows={8} />
            </Form.Group>
            <div className="d-grid gap-2">
                <Button variant="outline-success" size="lg">Update Answer</Button>
            </div>
        </Container>
    )
}

export default EditAnswerPage

import React, { useContext, useEffect, useState, useCallback} from 'react'
import { Card, Button, Container, Row, Col, Alert } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'


import '../App.css'
import '../css/profilePage.css'

const ProfilePage = () => {

    const {user, authTokens, show, alertType, alertMsg, setShow, setAlertType, setAlertMsg, handleVisibility} = useContext(AuthContext)
    const [isAuthorized, setIsAuthorized] = useState(false)
    const navigate = useNavigate()

    const { username } = useParams()

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [location, setLocation] = useState('')
    const [bio, setBio] = useState('')

    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])


    const getProfile = useCallback(async () => {
        const response = await fetch(`http://127.0.0.1:8000/profile/${username}`, {
            headers:{
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        if(response.status === 200){
            const data = await response.json();
            const userInfo = data['profile']
            const userQuestions = data['questions']
            const userAnswers = data['answers']
            setFullName(userInfo.full_name)
            setEmail(userInfo.email)
            setLocation(userInfo.location)
            setBio(userInfo.bio)
            setQuestions(userQuestions)
            setAnswers(userAnswers)
        }
        else{
            navigate('/page-not-found')
        }
    }, [username])


    const authorized = useCallback(() => {
        if(username === user['username']){
            setIsAuthorized(true)
        }
    }, [username])


    useEffect(() => {
        getProfile()
        authorized()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [getProfile, authorized])


    const deleteQues = async questionSlug => {
        const response = await fetch(`http://127.0.0.1:8000/question/${questionSlug}`, {
            method: 'DELETE',
            headers:{
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        if(response.status === 204){
            getProfile()
            setAlertType('success')
            setAlertMsg('Question deleted')
            handleVisibility()
        }
        navigate(`/profile/${user['username']}`)
    }


    const deleteAns = async answerId => {
        const response = await fetch(`http://127.0.0.1:8000/answer/${answerId}`, {
            method: 'DELETE',
            headers:{
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        if(response.status === 204){
            getProfile()
            setAlertType('success')
            setAlertMsg('Answer deleted')
            handleVisibility()
        }
        navigate(`/profile/${user['username']}`)
    }


    return (
        <Container>
            { show ?
        
                <Alert variant={alertType} onClose={() => setShow(false)} dismissible>{alertMsg}</Alert>
                : 
                null
            }
            
                <Card.Body>
                    <Card.Title><h3><i>{ fullName }</i></h3></Card.Title>
                    <br/>
                    <Card.Text >
                        <p className="card-text"><i className="fa fa-envelope profile_info"> {email ? email : "Email not available"}</i></p>
                        <p className="card-text"><i className="fa fa-map-marker profile_info"> {location ? location : "Location not available"}</i></p>
                        <p className="card-text"><i className="fa fa-info-circle profile_info"> {bio ? bio: "Bio not available"}</i></p>
                    </Card.Text>
                    <br/>

                    {/* Update Profile Button */}

                    { isAuthorized ?
                        <Link className='link' to='/edit_profile'>
                        <div className="d-grid gap-2">
                        <Button variant="outline-secondary" size="lg">
                            <i>Update Your Profile</i>
                        </Button>
                        </div>
                        </Link>
                        : 
                        null
                    }

                </Card.Body>
                <br/>
            
                    <Row>

                        {/* Questions Column */}

                        <Col>
                        <h5>{questions.length}{questions.length === 1 ? ' Question' : ' Questions'}</h5>
                        
                        { questions.map(question => (

                            <React.Fragment key={question.id}>
                                <Link className='link' to={`/question/${question.slug}/`}>{question.title}</Link>
                                
                                { isAuthorized ? 
                                    <React.Fragment>
                                    <Link to={`/update_question/${question.slug}/`}><Button variant='outline-success btn-sm'>Edit</Button></Link>
                                    <div onClick={() => deleteQues(question.slug)}><Button variant='outline-danger btn-sm'>Delete</Button></div>
                                    </React.Fragment>   
                                    :
                                    null 
                                }
                            </React.Fragment>
                        ))}
                        </Col>

                        {/* Answers Column */}

                        <Col>
                            <h5>{answers.length}{answers.length === 1 ? ' Answer' : ' Answers'}</h5>
                            { answers.map(answer => (
                                <React.Fragment key={answer.id}>
                                    <Link className='link' to={`/question/${answer.question_slug}/`}>{answer.answer}</Link>
                                    {
                                        isAuthorized ? 
                                        <React.Fragment>
                                        <Link to={`/edit_answer/${answer.id}`}><Button variant='outline-success btn-sm'>Edit</Button></Link>
                                        <div onClick={() => deleteAns(answer.id)}><Button variant='outline-danger btn-sm'>Delete</Button></div>
                                        <br/>
                                        </React.Fragment>
                                        :
                                        null 
                                    }
                                </React.Fragment>  
                            ))}
                        </Col>
                    </Row>
                
            
        </Container>
    )
}

export default ProfilePage
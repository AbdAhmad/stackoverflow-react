import React, { useContext, useEffect, useState, useCallback} from 'react'
import { Card, Button, Container, Row, Col, Alert } from 'react-bootstrap'
import { Link, useParams, useNavigate } from 'react-router-dom'

import AuthContext from '../context/AuthContext'
import useAxios from '../utils/useAxios'

import '../App.css'
import '../css/profilePage.css'

import Loader from '../components/Loader'

const ProfilePage = () => {

    const { user, 
            show, 
            alertType, 
            alertMsg, 
            setShow, 
            setAlertType, 
            setAlertMsg, 
            handleVisibility, 
            baseUrl,
            strFormatter } = useContext(AuthContext)

    const [isAuthorized, setIsAuthorized] = useState(false)
    const navigate = useNavigate()

    const api = useAxios()

    const { username } = useParams()

    const [fullName, setFullName] = useState('')
    const [email, setEmail] = useState('')
    const [location, setLocation] = useState('')
    const [bio, setBio] = useState('')

    const [questions, setQuestions] = useState([])
    const [answers, setAnswers] = useState([])

    const [loading, setLoading] = useState(true)

    document.title = 'Profile'

    const getProfile = useCallback(async () => {
        const response = await api.get(`${baseUrl}/profile/${username}/`)
        if(response['data'].status === 404){
            navigate('/page-not-found')
        }
        else if(response.status === 200){
            const data = await response['data']
            const userData = data['profile']
            const userQuestions = data['questions']
            const userAnswers = data['answers']
            setFullName(userData.full_name)
            setEmail(userData.email)
            setLocation(userData.location)
            setBio(userData.bio)
            setQuestions(userQuestions)
            setAnswers(userAnswers)

            setLoading(false)
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

        setLoading(true)
        
        const response = await api.delete(`${baseUrl}/question/${questionSlug}`)
        if(response.status === 204){
            getProfile()
            setAlertType('success')
            setAlertMsg('Question deleted')
            handleVisibility()
        }
        navigate(`/profile/${user['username']}`)
    }


    const deleteAns = async answerId => {

        setLoading(true)

        const response = await api.delete(`${baseUrl}/answer/${answerId}`)
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

            { loading ?
                <Loader/>
                :
                <>
                { show ?
        
                    <Alert variant={alertType} className='text-center' onClose={() => setShow(false)} dismissible>{alertMsg}</Alert>
                    : 
                    null
                }
    
                <Card>
                    <Card.Body>
                        <Card.Title className='text-center'><h3><i>{ fullName }</i></h3></Card.Title>
                        <br/>
                        <Card.Text className='profile-info'>
                            <p><i className="fa fa-envelope profile_info"> {email ? email : "Email not available"}</i></p>
                            <p><i className="fa fa-map-marker profile_info"> {location ? location : "Location not available"}</i></p>
                            <p><i className="fa fa-info-circle profile_info"> {bio ? bio: "Bio not available"}</i></p>
                        </Card.Text>
                    
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
                    
                    </Card>
                    
                    <Row>
    
                        {/* Questions Column */}
    
                        <Col className='p-5'>
                    
                        <h5 className='text-center'>{questions.length}{questions.length === 1 ? ' Question' : ' Questions'}</h5>
                        <br/>
                        { questions.map(question => (
    
                            <React.Fragment key={question.id}>
                                <Card className='p-3'>
                                        
                                <Link className='link' to={`/question/${question.slug}/`}><div className='ques-ans-body'>{strFormatter(question.title)}</div></Link>
                                
                                { isAuthorized ? 
                                    <React.Fragment>
                                        <br/>
                                       
                                        <Row>
                                            <Col className='p-1'>
                                                <Link className='link' to={`/update_question/${question.slug}/`}>
                                                    <div className="d-grid gap-2">
                                                        <Button variant='outline-success btn-sm'>Edit</Button>
                                                    </div>
                                                </Link>
                                            </Col>
                                            <Col className='p-1'>
                                                <div className="d-grid gap-2" onClick={() => deleteQues(question.slug)}>
                                                    <Button variant='outline-danger btn-sm'>Delete</Button>
                                                </div>
                                            </Col>
                                        </Row>
                                      
                                    </React.Fragment>   
                                    :
                                    null 
                                }
                                 
                                 </Card>
                                 <br/>
                            </React.Fragment>
                           
                        ))}
                      
                        </Col>
    
                        {/* Answers Column */}
    
                        <Col className='p-5'>
                            
                            <h5 className='text-center'>{answers.length}{answers.length === 1 ? ' Answer' : ' Answers'}</h5>
                            <br/>
                            { answers.map(answer => (
                                <React.Fragment key={answer.id}>
                                     <Card className='p-3'>
                                         
                                    <Link className='link' to={`/question/${answer.question_slug}/`}><div className='ques-ans-body'>{strFormatter(answer.answer)}</div></Link>
                                    {
                                        isAuthorized ? 
                                        <React.Fragment>
                                        <br/>
                                        <Row>
                                            <Col className='p-1'>
                                        <Link className='link' to={`/edit_answer/${answer.id}`}>
                                            <div className="d-grid gap-2">
                                                <Button variant='outline-success btn-sm'>Edit</Button>
                                            </div>
                                        </Link>
                                        </Col>
                                        <Col className='p-1'>
                                        <div className="d-grid gap-2" onClick={() => deleteAns(answer.id)}>
                                            <Button variant='outline-danger btn-sm'>Delete</Button>
                                        </div>
                                        </Col>
                                        </Row>
                                        </React.Fragment>
                                        :
                                        null 
                                    }
                                    
                                    </Card>
                                    <br/>
                                </React.Fragment>  
                                
                            ))}
                            
                        </Col>
                    </Row>
                    </>
            }

            
        </Container>
    )
}

export default ProfilePage
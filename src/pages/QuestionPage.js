import React, {useState, useEffect, useContext} from 'react'
import { Row, Col, Button, Form, Alert, Container } from 'react-bootstrap'
import UpVoteTri from '../components/UpVoteTri'
import DownVoteTri from '../components/DownVoteTri'
import CreatedInfo from '../components/CreatedInfo'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import useAxios from '../utils/useAxios'

import '../App.css'
import '../css/questionPage.css'

import Loader from '../components/Loader'

const QuestionPage = () => {

    const { viewsFormatter, 
            show, 
            alertType, 
            alertMsg, 
            setShow, 
            setAlertType, 
            setAlertMsg, 
            handleVisibility, 
            baseUrl } = useContext(AuthContext)

    const api = useAxios()

    const navigate = useNavigate()

    const {slug} = useParams()
    
    const [quesId, setQuesId] = useState(0)
    const [quesTitle, setQuesTitle] = useState('')
    const [quesBody, setQuesBody] = useState('')
    const [quesTags, setQuesTags] = useState('')
    const [quesUser,setQuesUser] = useState('')
    const [quesSlug, setQuesSlug] = useState('')
    const [quesCreatedAt, setQuesCreatedAt] = useState('')
    const [quesViews, setQuesViews] = useState(0)
    const [quesVotes, setQuesVotes] = useState(0)
    
    const [answers, setAnswers] = useState([])
    const [answer, setAnswer] = useState('')

    const [loading, setLoading] = useState(true)

    document.title = quesTitle

    const getQuestion = async () => {
        const response = await api.get(`${baseUrl}/question/${slug}`)
        if(response['data'].status === 404){
            navigate('/page-not-found')
        }
        else if(response.status === 200){
            const data = await response['data']
            const quesData = data['question']
            setQuesId(quesData.id)
            setQuesTitle(quesData.title)
            setQuesBody(quesData.body)
            setQuesTags(quesData.tags)
            setQuesUser(quesData.user)
            setQuesSlug(quesData.slug)
            setQuesCreatedAt(quesData.created_at)
            setQuesViews(quesData.views)
            setQuesVotes(quesData.votes)
            
            setAnswers(data['answers'])

            setLoading(false)
        }
    }


    const clearAnswerTextField = () => document.getElementById('answer-field').value = '' 


    const answerCreate = async (e) => {
        e.preventDefault()   

        setLoading(true)
        clearAnswerTextField()

        const formData = JSON.stringify({'answer': answer})

        const response = await api.post(`${baseUrl}/answer_create/${quesId}/`, formData, {
            headers:{
                'Content-Type': 'application/json',
            },
        })
        if(response.status === 201){
            getQuestion()
            setAlertType('success')
            setAlertMsg('Answer Posted')             
        }
        handleVisibility()
        navigate(`/question/${quesSlug}`)
    }


    const upVoteQues = async () => {

        setLoading(true)

        const response = await api.post(`${baseUrl}/upvote_ques/${quesId}/`,{
            headers:{
                'Content-Type': 'application/json',
            },
        })
        if(response.status === 201){
            getQuestion()
            setAlertType('success')
            setAlertMsg('You have upvoted this question')             
        }
        else if(response.status === 208){
            getQuestion()
            setAlertType('info')
            setAlertMsg('You have already upvoted this question')
        }
        handleVisibility()
    }


    const downVoteQues = async () => {

        setLoading(true)

        const response = await api.post(`${baseUrl}/downvote_ques/${quesId}/`,{
            headers:{
                'Content-Type': 'application/json',
            },
        })
        if(response.status === 201){
            getQuestion()
            setAlertType('success')
            setAlertMsg('You have downvoted this question')             
        }
        else if(response.status === 208){
            getQuestion()
            setAlertType('info')
            setAlertMsg('You have already downvoted this question')
        }
        handleVisibility()
    }


    const upVoteAns= async (ansId) => {

        setLoading(true)

        const response = await api.post(`${baseUrl}/upvote_ans/${ansId}/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
        })
        if(response.status === 201){
            getQuestion()
            setAlertType('success')
            setAlertMsg('You have upvoted this Answer')             
        }
        else if(response.status === 208){
            getQuestion()
            setAlertType('info')
            setAlertMsg('You have already upvoted this answer')
        }
        handleVisibility()
    }

    const downVoteAns = async (ansId) => {

        setLoading(true)

        const response = await api.post(`${baseUrl}/downvote_ans/${ansId}/`,{
            headers:{
                'Content-Type': 'application/json',
            },
        })
        if(response.status === 201){
            getQuestion()
            setAlertType('success')
            setAlertMsg('You have downvoted this Answer')             
        }
        else if(response.status === 208){
            getQuestion()
            setAlertType('info')
            setAlertMsg('You have already downvoted this answer')
        }
        handleVisibility()
    }


    useEffect(() => {
        getQuestion()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    return (

        <Container className='question-container'>

            { loading ? 
                <Loader/>
                :    
                <React.Fragment>

                { show ?
                
                    <Alert variant={alertType} className='text-center' onClose={() => setShow(false)} dismissible>{alertMsg}</Alert>
                    : 
                    null
                }
    
                {/* Question title */}
    
                <h2>{quesTitle}</h2>
                <p className="p-2 views">Viewed {viewsFormatter(quesViews)} times</p>
                <br/>
      
                <Row>
                    <Col xs={2} lg={1}>
                        <div className='votes-first-div'>
                            <div>
                                <div onClick={upVoteQues}><UpVoteTri/></div>
                                <div className="pt-1 pb-1 votes">{quesVotes}</div>
                                <div onClick={downVoteQues}><DownVoteTri/></div>
                            </div>
                        </div>
                    </Col>
           
                    <Col xs={10} lg={11}>
                        <div className='ques-ans-body'>{quesBody}</div>
                    </Col>
                    
                </Row>
              
                <br/>
    
                {/* Question tags and created info */}
    
                <Row>
                    <Col>
                        <div className='tags-div'>
                            { quesTags.split(/\s+/).map((tag, index) => (
                                <button key={index} className="btn-block btn btn-outline-primary btn-sm tag-btn">{tag}</button>
                            ))}
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className='info-div'>
                            <CreatedInfo user={quesUser} time={quesCreatedAt}/>
                        </div>
                    </Col>
                </Row>
                <hr/>
    
                {/* Answers */}
    
                <h3 className='p-2'>{answers.length}{answers.length === 1 ? ' Answer' : ' Answers'}</h3>
    
                { answers.map(ans => (
                    <div key={ans.id} className='mb-3'>
                        <Row>
                            <Col lg={1}>
                                <div className='votes-first-div'>
                                    <div>
                                        <div onClick={() => upVoteAns(ans.id)}><UpVoteTri /></div>
                                        <div className="pt-1 pb-1 votes">{ans.votes}</div>
                                        <div onClick={() => downVoteAns(ans.id)}><DownVoteTri/></div>
                                    </div>
                                </div>
                            </Col>
                            <Col lg={11}>
                                <div className='ques-ans-body'>{ans.answer}</div>
                            </Col>
                        </Row>
                        <Row>
                            <Col>
                                <div className='info-div'>
                                    <CreatedInfo user={ans.user} time={ans.created_at}/>
                                </div>
                            </Col>
                        </Row>
                    </div>
                ))}
                
    
                {/* Post Your Answer */}
    
                <Form onSubmit={answerCreate}>
                    <Form.Group className="mb-3">
                        <Form.Control id='answer-field' onChange={e => setAnswer(e.target.value)} placeholder="Your Answer" as="textarea" rows={8} required />
                    </Form.Group>
                    <div className="d-grid gap-2">
                        <Button type="submit" variant="outline-primary" size="lg">Post Your Answer</Button>
                    </div>
                </Form>
                </React.Fragment>
            }
        </Container>
        
    )
}

export default QuestionPage
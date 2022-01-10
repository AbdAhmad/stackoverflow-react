import React, {useState, useEffect, useContext, useCallback} from 'react'
import { Row, Col, Button, Form, Alert, Container } from 'react-bootstrap'
import UpVoteTri from '../components/UpVoteTri'
import DownVoteTri from '../components/DownVoteTri'
import CreatedInfo from '../components/CreatedInfo'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

import '../App.css'
import '../css/questionPage.css'

const QuestionPage = () => {

    const {authTokens, show, alertType, alertMsg, setShow, setAlertType, setAlertMsg, handleVisibility} = useContext(AuthContext)

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


    const getQuestion = async () => {
        const response = await fetch(`http://127.0.0.1:8000/question/${slug}`,{
            headers:{
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        if(response.status === 200){
            const data = await response.json()
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
        }
        else{
            navigate('/page-not-found')
        }
    }

    const clearAnswerTextField = () => document.getElementById('answer-field').value = '' 


    const answerSubmit = async (e) => {
        e.preventDefault()   

        clearAnswerTextField()

        const response = await fetch(`http://127.0.0.1:8000/answer_create/${quesId}/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
            body: JSON.stringify({'answer': answer})
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
        const response = await fetch(`http://127.0.0.1:8000/upvote_ques/${quesId}/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        if(response.status === 201){
            getQuestion()
            setAlertType('success')
            setAlertMsg('You have upvoted this question')             
        }
        else if(response.status === 208){
            setAlertType('info')
            setAlertMsg('You have already upvoted this question')
        }
        handleVisibility()
    }


    const downVoteQues = async () => {
        const response = await fetch(`http://127.0.0.1:8000/downvote_ques/${quesId}/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        if(response.status === 201){
            getQuestion()
            setAlertType('success')
            setAlertMsg('You have downvoted this question')             
        }
        else if(response.status === 208){
            setAlertType('info')
            setAlertMsg('You have already downvoted this question')
        }
        handleVisibility()
    }


    const upVoteAns= async (ansId) => {
        document.getElementsByClassName('answer-field').textContent = ''
        const response = await fetch(`http://127.0.0.1:8000/upvote_ans/${ansId}/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        if(response.status === 201){
            getQuestion()
            setAlertType('success')
            setAlertMsg('You have upvoted this Answer')             
        }
        else if(response.status === 208){
            setAlertType('info')
            setAlertMsg('You have already upvoted this answer')
        }
        handleVisibility()
    }

    const downVoteAns = async (ansId) => {
        const response = await fetch(`http://127.0.0.1:8000/downvote_ans/${ansId}/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        if(response.status === 201){
            getQuestion()
            setAlertType('success')
            setAlertMsg('You have downvoted this Answer')             
        }
        else if(response.status === 208){
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
        <Container>

        {/* Question title */}

        { show ?
        
            <Alert variant={alertType} onClose={() => setShow(false)} dismissible>{alertMsg}</Alert>
             : 
            null
        }

           

                <h2>{quesTitle}</h2>
                <p className="p-2">Viewed {quesViews} times</p>
                <hr/>
                <Row>
                    <Col xs={2}>
                        <div className='votes-first-div'>
                            <div>
                                <div onClick={upVoteQues}><UpVoteTri/></div>
                                <div className="pt-1 pb-1">{quesVotes}</div>
                                <div onClick={downVoteQues}><DownVoteTri/></div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={10}>

                    {/* Question body */}

                    <div className='body'>{quesBody}</div>

                    </Col>
                </Row>
                <Row>

                {/* Question tags */}

                    <Col>

                        {quesTags.split(/\s+/).map((tag, index) => (

                            <div className='btn-div' key={index}>
                                <button className="btn-block btn btn-outline-primary btn-sm tag">{tag}</button>
                            </div> 
                            ))
                        }
                    </Col>
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
                <React.Fragment key={ans.id}>
                    <Row>
                        <Col xs={2}>
                            <div className='votes-first-div'>
                                <div>
                                    <div onClick={() => upVoteAns(ans.id)}><UpVoteTri /></div>
                                    <div className="pt-1 pb-1">{ans.votes}</div>
                                    <div onClick={() => downVoteAns(ans.id)}><DownVoteTri/></div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={10}>
                        <div className='body'>{ans.answer}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className='info-div'>
                                <CreatedInfo user={ans.user} time={ans.created_at}/>
                            </div>
                        </Col>
                    </Row>
                </React.Fragment>
                ))}
            <hr/>

            {/* Post Your Answer */}

            <Form onSubmit={answerSubmit}>
                <Form.Group className="mb-3">
                    <Form.Control id='answer-field' onChange={e => setAnswer(e.target.value)} placeholder="Your Answer" as="textarea" rows={8} enteredDate="" required />
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button type="submit" variant="outline-primary" size="lg">Post Your Answer</Button>
                </div>
            </Form>
        </Container>

    )
}

export default QuestionPage
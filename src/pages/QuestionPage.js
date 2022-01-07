import React, {useState, useEffect, useContext} from 'react'
import { Row, Col, Button, Form, Alert } from 'react-bootstrap'
import UpVoteTri from '../components/UpVoteTri'
import DownVoteTri from '../components/DownVoteTri'
import CreatedInfo from '../components/CreatedInfo'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const QuestionPage = () => {

    const {authTokens, show, alertType, alertMsg, setShow, setAlertType, setAlertMsg, handleVisibility} = useContext(AuthContext)

    const navigate = useNavigate()

    let {slug} = useParams()
    
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

    // const [show, setShow] = useState(false);
    // const [alertType, setAlertType] = useState('')
    // const [alertMsg, setAlertMsg] = useState('')

    const getQuestion = async () => {
        const response = await fetch(`http://127.0.0.1:8000/question/${slug}`,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
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



    
    const upVoteQues = async () => {
        const response = await fetch(`http://127.0.0.1:8000/upvote_ques/${quesId}/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        console.log(response)
        if(response.status === 201){
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
        console.log(response)
        if(response.status === 201){
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
        const response = await fetch(`http://127.0.0.1:8000/upvote_ans/${ansId}/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        console.log(response)
        if(response.status === 201){
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
        console.log(response)
        if(response.status === 201){
            setAlertType('success')
            setAlertMsg('You have downvoted this Answer')             
        }
        else if(response.status === 208){
            setAlertType('info')
            setAlertMsg('You have already downvoted this answer')
        }
        handleVisibility()
    }


    const answerSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://127.0.0.1:8000/answer_create/${quesId}/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
            body: JSON.stringify({'answer': answer})
        })
        const data = await response.json()
        if(response.status === 201){
            setAlertType('success')
            setAlertMsg('Answer Posted')             
        }
        handleVisibility()
        navigate(`/question/${quesSlug}`)
        console.log(data)
    }

    useEffect(() => {
        getQuestion()
    }, [])

    return (
        <React.Fragment>

        {/* Question title */}

        { show ?
        
            <Alert variant={alertType} onClose={() => setShow(false)} dismissible>{alertMsg}</Alert>
             : 
            null
        }


            <React.Fragment >

                <h2>{quesTitle}</h2>
                <p style={{display: "flex"}} className="p-2">Viewed {quesViews} times</p>
                <hr/>
                <Row>
                    <Col xs={2}>
                        <div style={{flex: "0.1", display: "flex"}}>
                            <div>
                                <div onClick={upVoteQues}><UpVoteTri/></div>
                                <div style={{width: "100%", textAlign: "center"}} className="pt-1 pb-1">{quesVotes}</div>
                                <div onClick={downVoteQues}><DownVoteTri/></div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={10}>

                    {/* Question body */}

                    <div style={{whiteSpace: "preWrap", wordBreak: "breakWord", float: "left"}}>{quesBody}</div>

                    </Col>
                </Row>
                <Row>

                {/* Question tags */}

                    <Col>

                        {quesTags.split(/\s+/).map((tag, index) => (

                            <div style={{display: "inline-block"}} key={index}>
                                <button style={{marginLeft: "1px"}} className="btn-block btn btn-outline-primary btn-sm">{tag}</button>
                            </div> 
                            ))
                        }
                    </Col>
                    <Col>
                        <div style={{float: "right", paddingRight: "2%"}}>
                            <CreatedInfo user={quesUser} time={quesCreatedAt}/>
                        </div>
                    </Col>
                </Row>
            </React.Fragment>
            
            <hr/>

        {/* Answers */}

            <h3 style={{display: "flex"}}>{answers.length}{answers.length === 1 ? ' Answer' : ' Answers'}</h3>
            { answers.map(ans => (
                <React.Fragment key={ans.id}>
                    <Row>
                        <Col xs={2}>
                            <div style={{flex: "0.1", display: "flex"}}>
                                <div>
                                    <div onClick={() => upVoteAns(ans.id)}><UpVoteTri /></div>
                                    <div style={{width: "100%", textAlign: "center"}} className="pt-1 pb-1">{ans.votes}</div>
                                    <div onClick={() => downVoteAns(ans.id)}><DownVoteTri/></div>
                                </div>
                            </div>
                        </Col>
                        <Col xs={10}>
                        <div style={{whiteSpace: "preWrap", wordBreak: "breakWord"}}>{ans.answer}</div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div style={{float: "right", paddingRight: "2%"}}>
                                <CreatedInfo user={ans.user} time={ans.created_at}/>
                            </div>
                        </Col>
                    </Row>
                </React.Fragment>
                ))}
            <hr/>

            {/* Post Your Answer */}

            <Form onSubmit={answerSubmit}>
                <Form.Group style={{padding: "10px"}} className="mb-3">
                    <Form.Control onChange={e => setAnswer(e.target.value)} placeholder="Your Answer" as="textarea" rows={8} required />
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button type="submit" variant="outline-primary" size="lg">Post Your Answer</Button>
                </div>
            </Form>
        </React.Fragment>

    )
}

export default QuestionPage
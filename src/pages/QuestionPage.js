import React, {useState, useEffect, useContext} from 'react'
import { Row, Col, Button, Form } from 'react-bootstrap'
import UpVoteTri from '../components/UpVoteTri'
import DownVoteTri from '../components/DownVoteTri'
import CreatedInfo from '../components/CreatedInfo'
import { useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const QuestionPage = () => {

    const {authTokens} = useContext(AuthContext)

    let {slug} = useParams()

    const [question, setQuestion] = useState([])
    const [answers, setAnswers] = useState([])
    const [answer, setAnswer] = useState('')


    const getQuestion = async () => {
        const response = await fetch(`http://127.0.0.1:8000/question/${slug}`,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        const data = await response.json()
        setQuestion([data['question']])
        setAnswers(data['answers'])
    } 

    
    const upVoteQues = async () => {
        const response = await fetch(`http://127.0.0.1:8000/upvote_ques/${question[0]?.id}/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        
        const data = await response.json()
        console.log(data)
       
    }

    const downVoteQues = async () => {
        const response = await fetch(`http://127.0.0.1:8000/downvote_ques/${question[0]?.id}/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        
        const data = await response.json()
        console.log(data)
    }

    const upVoteAns= async (ansId) => {
        const response = await fetch(`http://127.0.0.1:8000/upvote_ans/${ansId}/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        
        const data = await response.json()        
        console.log(data)
    }

    const downVoteAns = async (ansId) => {
        const response = await fetch(`http://127.0.0.1:8000/downvote_ans/${ansId}/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        
        const data = await response.json()
        console.log(data)
    }


    const answerSubmit = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://127.0.0.1:8000/answer_create/${question[0]?.id}/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
            body: JSON.stringify({'answer': answer})
        })
        
        const data = await response.json()
        console.log(data)
    }

    useEffect(() => {
        getQuestion()
    }, [])

    return (
        <React.Fragment>

        {/* Question title */}

        { question.map((ques) => (

            <React.Fragment>
                <h2>{ques.title}</h2>
                <p style={{display: "flex"}} class="p-2">Viewed {ques.views} times</p>
                <hr/>
                <Row>
                    <Col xs={2}>
                        <div style={{flex: "0.1", display: "flex"}}>
                            <div>
                                <div onClick={upVoteQues}><UpVoteTri/></div>
                                <div style={{width: "100%", textAlign: "center"}} className="pt-1 pb-1">{ques.votes}</div>
                                <div onClick={downVoteQues}><DownVoteTri/></div>
                            </div>
                        </div>
                    </Col>
                    <Col xs={10}>

                    {/* Question body */}

                    <div style={{whiteSpace: "preWrap", wordBreak: "breakWord", float: "left"}}>{ques.body}</div>

                    </Col>
                </Row>
                <Row>

                {/* Question tags */}

                    <Col>

                        {ques.tags.split(/\s+/).map((tag) => (

                            <div style={{display: "inline-block"}}>
                                <button style={{marginLeft: "1px"}} className="btn-block btn btn-outline-primary btn-sm">{tag}</button>
                            </div> 
                            ))
                        }
                    </Col>
                    <Col>
                        <div style={{float: "right", paddingRight: "2%"}}>
                            <CreatedInfo user={ques.user} time={ques.created_at}/>
                        </div>
                    </Col>
                </Row>
            </React.Fragment>
            ))
            }

            <hr/>

        {/* Answers */}

            <h3 style={{display: "flex"}}>1 Answer</h3>
            { answers.map((ans) => (
                <React.Fragment>
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
                ))
                }

            <hr/>

            {/* Post Your Answer */}

            <Form onSubmit={answerSubmit}>
                <Form.Group style={{padding: "10px"}} className="mb-3">
                    <Form.Control onChange={e => setAnswer(e.target.value)} placeholder="Your Answer" as="textarea" rows={8} />
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button type="submit" variant="outline-primary" size="lg">Post Your Answer</Button>
                </div>
            </Form>
        </React.Fragment>

    )
}

export default QuestionPage
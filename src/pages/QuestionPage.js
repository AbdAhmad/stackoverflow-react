import React, {useState, useEffect, useContext} from 'react'
import { Card, Row, Col, Button, Form, Container } from 'react-bootstrap'
import UpVoteTri from '../components/UpVoteTri'
import DownVoteTri from '../components/DownVoteTri'
import ObjectInfo from '../components/ObjectInfo'
import { Link, useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const QuestionPage = () => {

    const {authTokens} = useContext(AuthContext)

    let {slug} = useParams()

    let [question, setQuestion] = useState([])
    let [answers, setAnswers] = useState([])
    let [answer, setAnswer] = useState('')


    let getQuestion = async () => {
        let response = await fetch(`http://127.0.0.1:8000/question/${slug}`,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        let data = await response.json()
        setQuestion([data['question']])
        setAnswers(data['answers'])
    } 

    // let getAnswers = async () => {
   
    //     let response = await fetch(`http://127.0.0.1:8000/answer/${question[0]?.id}`,{
    //         headers:{
    //             'Content-Type': 'application/json',
    //             'Authorization': `Bearer ${authTokens?.access}`
    //         },
    //     })
    //     if(response.status === 200){
    //         let data = await response.json()
    //         setAnswers([data])
    //     } 
     
    // } 
    
    let upVoteQues = async () => {
        let response = await fetch(`http://127.0.0.1:8000/upvote_ques/${question[0]?.id}/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        
        let data = await response.json()
       
    }

    let downVoteQues = async () => {
        let response = await fetch(`http://127.0.0.1:8000/downvote_ques/${question[0]?.id}/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        
        let data = await response.json()
    }

    let upVoteAns= async (ans) => {
      
        let response = await fetch(`http://127.0.0.1:8000/upvote_ans/${ans}/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        
        let data = await response.json()
       
    }

    let downVoteAns = async () => {
        let response = await fetch(`http://127.0.0.1:8000/downvote_ques/${question[0]?.id}/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        
        let data = await response.json()
    }

    let handleSubmit = e => {
        e.preventDefault()
        console.log('in handleSubmit')
        answerSubmit()
    }

    let answerSubmit = async () => {
        let response = await fetch(`http://127.0.0.1:8000/answer_create/${question[0]?.id}/`,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
            body: JSON.stringify({'answer': answer})
        })
        
        let data = await response.json()
        console.log(data)
    }

    useEffect(() => {
        getQuestion()
        // getAnswers()
    }, [])

    return (
        <React.Fragment>

        {/* Question title */}

        {question.map((ques) => (
            <React.Fragment>
            
            <h2>{ques.title}</h2>
            <p style={{display: "flex"}} class="p-2">Viewed {ques.views} times</p>
            <hr/>
            <Row>
            <Col xs={2}>
                <div style={{flex: "0.1", display: "flex"}}>
                    <div>
                        <div onClick={upVoteQues}>
                            <UpVoteTri/>
                        </div>
                        <div style={{width: "100%", textAlign: "center"}} className="pt-1 pb-1">{ques.votes}</div>
                        <div onClick={downVoteQues}>
                            <DownVoteTri/>
                        </div>
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
                <ObjectInfo user={ques.user} time={ques.created_at}/>
            </div>
            </Col>
            </Row>
            </React.Fragment>
            ))
        }

        <hr/>
        <h3 style={{display: "flex"}}>1 Answer</h3>
        { answers.map((ans) => (
            <React.Fragment>
           
            <Row>
            <Col xs={2}>
            <div style={{flex: "0.1", display: "flex"}}>
                <div>
                    <div onClick={upVoteAns({ans})}>
                    <UpVoteTri />
                    </div>
                    <div style={{width: "100%", textAlign: "center"}} className="pt-1 pb-1">{ans.votes}</div>
                    <div onClick={downVoteAns({ans})}>
                    <DownVoteTri/>
                    </div>
                </div>
            </div>
            </Col>
            <Col xs={10}>

            {/* Answer Body */}

            <div style={{whiteSpace: "preWrap", wordBreak: "breakWord"}}>{ans.answer}</div>
            </Col>
            </Row>
            <Row>
            <Col>
            <div style={{float: "right", paddingRight: "2%"}}>
                <ObjectInfo user={ans.user} time={ans.created_at}/>
            </div>
            </Col>
            </Row>
            </React.Fragment>
            ))
        }

        <hr/>
        <Form onSubmit={handleSubmit}>
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
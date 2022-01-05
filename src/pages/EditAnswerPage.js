import React, {useEffect, useContext, useState} from 'react'
import { Row, Col, Button, Form, Container  } from 'react-bootstrap'
import UpVoteTri from '../components/UpVoteTri'
import DownVoteTri from '../components/DownVoteTri'
import { useParams } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import CreatedInfo from '../components/CreatedInfo'


const EditAnswerPage = () => {

    const {authTokens} = useContext(AuthContext)

    const {pk} = useParams()

    const [answer, setAnswer] = useState('')
    const [question, setQuestion] = useState([])

    const getAnswer = async () => {
        const response = await fetch(`http://127.0.0.1:8000/answer/${pk}`, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        const data = await response.json()
        console.log(data['answer'].answer)
        setAnswer(data['answer'].answer)
        setQuestion([data['question']])
    }

    const updateAnswer = async (e) => {
        e.preventDefault()
        const response = await fetch(`http://127.0.0.1:8000/answer/${pk}/`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
            body: JSON.stringify({'answer': answer})
        })

        console.log(response)
    }

    useEffect(() => {
        getAnswer()
    }, [])

    return (
        <Container>

            {/* Question */}

            { question.map((ques) => (

            <React.Fragment>
            <h2 style={{display: "flex"}}>{ques.title}</h2>
            <p style={{display: "flex"}} class="p-2">Viewed {ques.views} times</p>
            <hr/>
            <Row>
                <Col xs={2}>
                    <div style={{flex: "0.1", display: "flex"}}>
                        <div>
                            <UpVoteTri />
                            <div style={{width: "100%", textAlign: "center"}} className="pt-1 pb-1">{ques.views}</div>
                            <DownVoteTri />
                        </div>
                    </div>
                </Col>
                <Col xs={10}>
                    <p>{ques.body}</p>
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
            <hr/>
            </React.Fragment>
            ))}

            {/* Answer Form */}
  
            <Form onSubmit={updateAnswer}>  

                {/* Answer Field */}

                <Form.Group style={{padding: "10px"}} className="mb-3">
                    <Form.Control value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Your Answer" as="textarea" rows={8} />
                </Form.Group>

                {/* Update Answer Button */}

                <div className="d-grid gap-2">
                    <Button variant="outline-success" type='submit' size="lg">Update Answer</Button>
                </div>
            </Form>
        </Container>
    )
}

export default EditAnswerPage

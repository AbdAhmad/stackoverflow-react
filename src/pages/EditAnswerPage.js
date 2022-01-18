import React, {useEffect, useContext, useState} from 'react'
import { Row, Col, Button, Form, Container  } from 'react-bootstrap'
import UpVoteTri from '../components/UpVoteTri'
import DownVoteTri from '../components/DownVoteTri'
import { useParams, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import CreatedInfo from '../components/CreatedInfo'
import useAxios from '../utils/useAxios'

import '../App.css'
import '../css/editAnswerPage.css'


const EditAnswerPage = () => {

    const { viewsFormatter, 
            setAlertType, 
            setAlertMsg, 
            handleVisibility, 
            baseUrl } = useContext(AuthContext)

    const { pk } = useParams()

    const api = useAxios()

    const navigate = useNavigate()

    const [quesTitle, setQuesTitle] = useState('')
    const [quesBody, setQuesBody] = useState('')
    const [quesTags, setQuesTags] = useState('')
    const [quesUser,setQuesUser] = useState('')
    const [quesSlug, setQuesSlug] = useState('')
    const [quesCreatedAt, setQuesCreatedAt] = useState('')
    const [quesViews, setQuesViews] = useState(0)
    const [quesVotes, setQuesVotes] = useState(0)

    const [answer, setAnswer] = useState('')

    document.title = quesTitle

    const getAnswer = async () => {
        const response = await api.get(`${baseUrl}/answer/${pk}`)
        const data = await response['data']
        const quesData = data['question']
        setQuesTitle(quesData.title)
        setQuesBody(quesData.body)
        setQuesTags(quesData.tags)
        setQuesUser(quesData.user)
        setQuesSlug(quesData.slug)
        setQuesCreatedAt(quesData.created_at)
        setQuesViews(quesData.views)
        setQuesVotes(quesData.votes)

        setAnswer(data['answer'].answer)
        
    }

    const updateAnswer = async (e) => {
        e.preventDefault()
        const formData = JSON.stringify({'answer': answer})
        const response = await api.put(`${baseUrl}/answer/${pk}/`, formData, {
            headers:{
                'Content-Type': 'application/json',
            },
    
        })
        if(response.status === 200){
            setAlertType('success')
            setAlertMsg('Answer Updated')
            handleVisibility()
        }
        navigate(`/question/${quesSlug}`)
    }

    useEffect(() => {
        getAnswer()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container className='edit-ques-container'>

            {/* Question */}

            <React.Fragment>
                <h2 className='h2-p'>{quesTitle}</h2>
                <p className="h2-p">Viewed {viewsFormatter(quesViews)} times</p>
                <hr/>
                <Row>
                    <Col xs={2}>
                        <div className='h2-p' style={{flex: "0.1"}}>
                            <div>
                                <UpVoteTri />
                                <div className="votes">{quesVotes}</div>
                                <DownVoteTri />
                            </div>
                        </div>
                    </Col>
                    <Col xs={10}>
                        <span>{quesBody}</span>
                    </Col>
                </Row>
                <Row>

                    {/* Question tags */}

                    <Col>
                    {quesTags.split(/\s+/).map((tag) => (

                        <div style={{display: "inline-block"}}>
                            <button style={{marginLeft: "1px"}} className="btn-block btn btn-outline-primary btn-sm">{tag}</button>
                        </div> 
                        ))
                    }
                    </Col>
                    <Col>
                        <div className='createdComponent'>
                            <CreatedInfo user={quesUser} time={quesCreatedAt}/>
                        </div>
                    </Col>
                </Row>
                <hr/>
            </React.Fragment>
        

            {/* Answer Form */}
  
            <Form onSubmit={updateAnswer}>  

                {/* Answer Field */}

                <Form.Group className="mb-3">
                    <Form.Control value={answer} onChange={e => setAnswer(e.target.value)} placeholder="Your Answer" as="textarea" rows={8} required />
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

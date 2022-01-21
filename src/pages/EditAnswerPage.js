import React, {useEffect, useContext, useState} from 'react'
import { Row, Col, Button, Form, Container  } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'
import CreatedInfo from '../components/CreatedInfo'
import useAxios from '../utils/useAxios'

import '../App.css'
import '../css/editAnswerPage.css'

import Loader from '../components/Loader'

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

    const [answer, setAnswer] = useState('')

    const [loading, setLoading] = useState(true)

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

        setAnswer(data['answer'].answer)

        setLoading(false)
        
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

            { loading ?
            <Loader/>
            :
            <>
                {/* Question */}

                <React.Fragment>

                <h2>{quesTitle}</h2>
                <p className="p-2 views">Viewed {viewsFormatter(quesViews)} times</p>
                <br/>
                <Row>
                    <Col>
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
            </>
            }
        </Container>
    )
}

export default EditAnswerPage

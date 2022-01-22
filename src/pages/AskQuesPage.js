import React, { useContext, useEffect, useState } from 'react'
import { Card, Button, Form, Container, Alert } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom'

import AuthContext from '../context/AuthContext'
import useAxios from '../utils/useAxios'

import '../App.css'
import '../css/askQuestionPage.css'

import Loader from '../components/Loader'


const AskQuesPage = () => {

    const { setAlertType, 
            setAlertMsg, 
            show,
            alertType,
            setShow,
            alertMsg,
            handleVisibility, 
            baseUrl } = useContext(AuthContext)

    const api = useAxios()

    const navigate = useNavigate()

    const {slug} = useParams();

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState('')

    const [loading, setLoading] = useState(false)


    document.title = 'Ask a Question'

    useEffect(() => {
        if(slug){
            setLoading(true)
            getQuestion()
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    const getQuestion = async () => {
        const response = await api.get(`${baseUrl}/question/${slug}/`)
        const data = await response['data']
        const questionData = data['question']
        setTitle(questionData.title)
        setBody(questionData.body)
        setTags(questionData.tags)

        setLoading(false)
    }


    const handleSubmit = e => {
        e.preventDefault()
        if(slug){
            updateQuestion()
        }else{
            createQuestion()
        }
    }


    const createQuestion = async () => {
        const formData = JSON.stringify({'title':title, 'body':body, 'tags':tags})
        const response = await api.post(`${baseUrl}/question/`, formData, {
            headers:{
                'Content-Type': 'application/json',
            }
        })
        if(response['data'].status === 201){
            const data = await response['data'].data
            const questionSlug = data.slug
            setAlertType('success')
            setAlertMsg('Question posted')
            handleVisibility()
            navigate(`/question/${questionSlug}`)
        }else{
            setAlertType('danger')
            setAlertMsg("This question can't be posted. Try something different")
            handleVisibility()
        }
    }


    const updateQuestion = async () => {
        const formData = JSON.stringify({'title':title, 'body':body, 'tags':tags})
        const response = await api.put(`${baseUrl}/question/${slug}/`, formData, {
            headers:{
                'Content-Type': 'application/json',
            }
        })
        if(response.status === 200){
            const slug = response['data'].slug
            setAlertType('success')
            setAlertMsg('Question updated')
            handleVisibility()
            navigate(`/question/${slug}`)
        }
    }


    return (
        <Container>

            { loading ?
                <Loader/>
            :
            <React.Fragment>

            { show ?
            
            <Alert variant={alertType} className='text-center' onClose={() => setShow(false)} dismissible>{alertMsg}</Alert>
            : 
            null
            }

            <h3 className='text-center'>Ask a public question</h3>

            {/* Ask Question Form */}
            <Card>
                <Form onSubmit={handleSubmit}>
                    <Card.Body>

                        {/* Title Field */}

                        <Card.Title className='cardTitleText'>Title</Card.Title>
                        <Card.Text className='cardTitleText'>
                            Be specific and imagine you’re asking a question to another person.
                        </Card.Text>
                        <Form.Group className="mb-4">
                            <Form.Control type="text" value={title} name="title" onChange={e => setTitle(e.target.value)}  placeholder="e.g. is there an R function for finding the index of an element in a vector?" required />
                        </Form.Group>

                        {/* Body Field */}

                        <Card.Title className='cardTitleText'>Body</Card.Title>
                        <Card.Text className='cardTitleText'>
                            Include all the information someone would need to answer your question.
                        </Card.Text>
                        <Form.Group className="mb-4">
                            <Form.Control name="body" value={body} onChange={e => setBody(e.target.value)} as="textarea" rows={5} required />
                        </Form.Group>

                        {/* Tags Field */}

                        <Card.Title className='cardTitleText'>Tags</Card.Title>
                        <Card.Text className='cardTitleText'>
                            Add up to 5 tags to describe what your question is about
                        </Card.Text>
                        <Form.Group className="mb-4">
                            <Form.Control type="text" value={tags} name="tags" onChange={e => setTags(e.target.value)} placeholder="e.g.  python  javacript  django" required/>
                        </Form.Group>

                        {/* Submit Button */}

                        <div className="d-grid gap-2">
                            <Button variant="outline-primary" type='submit' size="lg">Post Your Question</Button>
                        </div>
                    </Card.Body>
                </Form>
                </Card>
                </React.Fragment>
            }


        </Container>
    )
}

export default AskQuesPage
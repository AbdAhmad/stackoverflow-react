import React, { useContext, useEffect, useState } from 'react'
import { Card, Button, Form } from 'react-bootstrap'
import AuthContext from '../context/AuthContext'
import { useParams } from 'react-router-dom'


const AskQuesPage = () => {

    const {authTokens} = useContext(AuthContext)

    const {slug} = useParams();

    useEffect(() => {
        console.log('inside')
        if(slug){
            getQuestion()
        }
    }, [])



    const getQuestion = async () => {
        const response = await fetch(`http://127.0.0.1:8000/question/${slug}`, {
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        const data = await response.json();
        let questionData = data['question']
        setTitle(questionData.title)
        setBody(questionData.body)
        setTags(questionData.tags)
    }


    const myStyle = {
        display: "flex"
    }

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState('')

    const handleSubmit = e => {
        e.preventDefault()
        if(slug){
            updateQuestion()
        }else{
            createQuestion()
        }
    }


    const createQuestion = async () => {
        const response = await fetch('http://127.0.0.1:8000/question/', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
            body:JSON.stringify({'title':title, 'body':body, 'tags':tags})
        })
        const data = await response.json();
        console.log(data)
    }


    const updateQuestion = async () => {
        const response = await fetch(`http://127.0.0.1:8000/question/${slug}/`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
            body:JSON.stringify({'title':title, 'body':body, 'tags':tags})
        })
        const data = await response.json();
        console.log(data)
    }


    return (
        <React.Fragment>
            <h3 style={{display: "flex", marginLeft: "5%"}}>Ask a public question</h3>
            <Card style={{width: "90%", marginLeft: "5%", display: "flex", marginTop: "20px"}}>
            <Form onSubmit={handleSubmit}>
            <Card.Body>
                <Card.Title style={myStyle}>Title</Card.Title>
                <Card.Text style={myStyle}>
                Be specific and imagine you’re asking a question to another person.
                </Card.Text>
                <Form.Group className="mb-4">
                        <Form.Control type="text" value={title} name="title" onChange={e => setTitle(e.target.value)}  placeholder="e.g. is there an R function for finding the index of an element in a vector?" />
                </Form.Group>
                <Card.Title style={myStyle}>Body</Card.Title>
                <Card.Text style={myStyle}>
                Include all the information someone would need to answer your question.
                </Card.Text>
                <Form.Group className="mb-4">
                    <Form.Control name="body" value={body} onChange={e => setBody(e.target.value)} as="textarea" rows={5} />
                </Form.Group>
                <Card.Title style={myStyle}>Tags</Card.Title>
                <Card.Text style={myStyle}>
                Add up to 5 tags to describe what your question is about
                </Card.Text>
                <Form.Group className="mb-4">
                    <Form.Control type="text" value={tags} name="tags" onChange={e => setTags(e.target.value)} placeholder="e.g.  python  javacript  django" />
                </Form.Group>
                <div className="d-grid gap-2">
                <Button variant="outline-primary" type='submit' size="lg">
                    Post Your Question
                </Button>
                </div>
            </Card.Body>
            </Form>
            </Card>
        </React.Fragment>
    )
}

export default AskQuesPage
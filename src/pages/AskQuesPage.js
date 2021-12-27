import React, { useContext, useState } from 'react'
import { Card, Button, Form, Container } from 'react-bootstrap'
import AuthContext from '../context/AuthContext'

const AskQuesPage = () => {

    const {authTokens} = useContext(AuthContext)

    const myStyle = {
        display: "flex"
    }

    const [title, setTitle] = useState('')
    const [body, setBody] = useState('')
    const [tags, setTags] = useState('')

    // const handleChange = (e) => {
    //     setTitle(e.target.)
    // }

    const handleSubmit = e => {   
        e.preventDefault()
        questionSubmit()
    }

    const questionSubmit = async (e) => {
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

    return (
        <>
            <h3 style={{display: "flex", marginLeft: "5%"}}>Ask a public question</h3>
            <Card style={{width: "90%", marginLeft: "5%", display: "flex", marginTop: "20px"}}>
            <Form onSubmit={handleSubmit}>
            <Card.Body>
                <Card.Title style={myStyle}>Title</Card.Title>
                <Card.Text style={myStyle}>
                Be specific and imagine you’re asking a question to another person.
                </Card.Text>
                <Form.Group className="mb-4">
                        <Form.Control type="text" name="title" onChange={e => setTitle(e.target.value)}  placeholder="e.g. is there an R function for finding the index of an element in a vector?" />
                </Form.Group>
                <Card.Title style={myStyle}>Body</Card.Title>
                <Card.Text style={myStyle}>
                Include all the information someone would need to answer your question.
                </Card.Text>
                <Form.Group className="mb-4">
                    <Form.Control name="body" onChange={e => setBody(e.target.value)} as="textarea" rows={5} />
                </Form.Group>
                <Card.Title style={myStyle}>Tags</Card.Title>
                <Card.Text style={myStyle}>
                Add up to 5 tags to describe what your question is about
                </Card.Text>
                <Form.Group className="mb-4">
                    <Form.Control type="text" name="tags" onChange={e => setTags(e.target.value)} placeholder="e.g.  python  javacript  django" />
                </Form.Group>
                <div className="d-grid gap-2">
                <Button variant="outline-primary" type='submit' size="lg">
                    Post Your Question
                </Button>
                </div>
            </Card.Body>
            </Form>
            </Card>
        </>
    )
}

export default AskQuesPage
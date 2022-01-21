import React, { useState, useEffect, useContext } from 'react'
import { Button, Row, Col, Container, Alert, Navbar, Nav } from 'react-bootstrap'
import {
    Link
} from "react-router-dom"

import AuthContext from '../context/AuthContext'
import CreatedInfo from '../components/CreatedInfo'
import useAxios from '../utils/useAxios'

import '../App.css'
import '../css/questionsPage.css'

import Loader from '../components/Loader'

const QuestionsPage = () => {

    const { viewsFormatter, 
            show, 
            alertType, 
            alertMsg, 
            setShow, 
            baseUrl,
            strFormatter } = useContext(AuthContext)

    const api = useAxios()

    const [questions, setQuestions] = useState([])
    const [questionOrder, setQuestionOrder] = useState('')

    const [loading, setLoading] = useState(true)


    document.title = 'Stack Overflow - Where Developers Learn, Share, &amp; Build Careers'
 
    const getQuestions = async () => {

        setLoading(true)

        const response = await api.get(`${baseUrl}/question/`)
        const data = response['data']
        const questions = data['questions']
        const viewBy = data['question_order']
        setQuestions(questions)
        setQuestionOrder(viewBy)

        setLoading(false)
    }


    const latestQuestions = async () => {

        setLoading(true)

        const response = await api.get(`${baseUrl}/question?q=latest`)
        const data = await response['data']
        const questions = await data['questions']
        const viewBy = await data['question_order']
        setQuestions(questions)
        setQuestionOrder(viewBy)

        setLoading(false)
    }


    useEffect(() => {
        getQuestions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    return (
       
        <Container className='container'>

            { show ?
                <Alert variant={alertType} className='text-center' onClose={() => setShow(false)} dismissible>{alertMsg}</Alert>
                : 
                null
            }
        
            <div className="first-div">
                <h3>Questions</h3>
                <Link to="/ask"><Button variant="primary">Ask</Button></Link>
            </div>
            <Navbar className='nav-style justify-content-center'>
                <Nav className="pagination-sm"> 
                    <React.Fragment>
                        <Nav.Item onClick={latestQuestions} className={`page-item ${questionOrder === 'latest'? 'active': null}`}><Link className="page-link" to="?q=latest">Latest</Link></Nav.Item>
                        <Nav.Item onClick={getQuestions} className={`page-item ${questionOrder !== 'latest'? 'active': null}`}><Link className="page-link" to="?q=mostviewed">Most viewed</Link></Nav.Item>
                    </React.Fragment>
                </Nav>
            </Navbar>
            <br/>

            { loading ?
                <Loader/>
                :
                <>

                {/* Questions List */}
    
                { questions.map(question => (
                    <React.Fragment key={question.id}>
                    <Row>
                        <Col lg={4}>
                            <div className="text-center votes-ans-views-div">
                                <div style={{color: question.votes > 0 ? "#009900": question.votes < 0 ? "#FF3333": "#404040", flex: "0.3"}}>{question.votes}<br/>Votes</div>
                                <div style={{color: question.ans_count > 0 ? "#FF8000": "#404040", flex: "0.3"}}>{question.ans_count}<br/>Answers</div>
                                <div style={{color: question.views > 999 ? "#994C00": "#404040", flex: "0.3"}}>{viewsFormatter(question.views)}<br/>Views</div> 
                            </div>
                        </Col>
                        <Col lg={8}>
    
                            {/* Question Title */}
                       
                            <h5><Link style={{textDecoration: "none"}} to={`/question/${question.slug}`}>{strFormatter(question.title)}</Link></h5>
                     
                            {/* Question Tags */}
                            
                            <div className='tags-div'>
                                { question.tags.split(/\s+/).map((tag, index) => (
                                    <button key={index} className="btn-block btn btn-outline-primary btn-sm tag-btn">{tag}</button>
                                ))}
                            </div>
                                
                            <div className='info-div'>
                                <CreatedInfo user={question.user} time={question.created_at} />
                            </div>
    
                        </Col>
                    </Row>
                    <br/>
                    </React.Fragment>
                ))}
    
                </>
            }


            
        </Container>
    )
}

export default QuestionsPage
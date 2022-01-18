import React, { useState, useEffect, useContext } from 'react'
import { Button, Row, Col, Container, Alert, Card } from 'react-bootstrap'
import {
    Link
} from "react-router-dom"

import AuthContext from '../context/AuthContext'
import CreatedInfo from '../components/CreatedInfo'
import useAxios from '../utils/useAxios'

import '../App.css'
import '../css/questionsPage.css'


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

    document.title = 'Stack Overflow - Where Developers Learn, Share, &amp; Build Careers'
 
    const getQuestions = async () => {
        const response = await api.get(`${baseUrl}/question/`)
        const data = response['data']
        const questions = data['questions']
        const viewBy = data['question_order']
        setQuestions(questions)
        setQuestionOrder(viewBy)
    }


    const latestQuestions = async () => {
        const response = await api.get(`${baseUrl}/question?q=latest`)
        const data = await response['data']
        const questions = await data['questions']
        const viewBy = await data['question_order']
        setQuestions(questions)
        setQuestionOrder(viewBy)
    }


    useEffect(() => {
        getQuestions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    return (
       
        <Container className='container'>

            { show ?
                <Alert variant={alertType} onClose={() => setShow(false)} dismissible>{alertMsg}</Alert>
                : 
                null
            }
        
            <div className="first-div">
                <h3>Questions</h3>
                <Link to="/ask"><Button variant="primary">Ask</Button></Link>
            </div>
            <nav className='nav-style'>
                <ul className="pagination pagination-sm"> 
                    <React.Fragment>
                    <div onClick={latestQuestions}>
                        <li className={`page-item ${questionOrder === 'latest'? 'active': null}`}><Link className="page-link" to="?q=latest">Latest</Link></li>
                    </div>
                    <div onClick={getQuestions}>
                        <li className={`page-item ${questionOrder !== 'latest'? 'active': null}`}><Link className="page-link" to="?q=mostviewed">Most viewed</Link></li>
                    </div>
                    </React.Fragment>
                </ul>
            </nav>
            <br/>

            {/* Questions List */}

            <Card>
            <br/>
            { questions.map(question => (
                <React.Fragment key={question.id}>
                <Row>
                    <Col>
                        <div className="text-center votes-ans-views-div">
                            <div style={{color: question.votes > 0 ? "#009900": question.votes < 0 ? "#FF3333": "#404040", flex: "0.3"}}>{question.votes}<br/>Votes</div>
                            <div style={{color: question.ans_count > 0 ? "#FF8000": "#404040", flex: "0.3"}}>{question.ans_count}<br/>Answers</div>
                            <div style={{color: question.views > 999 ? "#994C00": "#404040", flex: "0.3"}}>{viewsFormatter(question.views)}<br/>Views</div> 
                        </div>
                    </Col>
                    <Col md={8}>

                        <h5><Link style={{textDecoration: "none"}} to={`/question/${question.slug}`}>{strFormatter(question.title)}</Link></h5>
                        
                        {/* Question Tags */}
  
                        { question.tags.split(/\s+/).map((tag, index) => (
                                <div className='tag-div'>
                                    <button key={index} className="btn-block btn btn-outline-primary btn-sm tag-btn">{tag}</button>
                                </div>
                            ))
                        }

                        <div className='info-div'>
                            <CreatedInfo user={question.user} time={question.created_at} />
                        </div>
                    </Col>
                </Row>
                <br/>
                </React.Fragment>
            ))}
            </Card>
        </Container>
    )
}

export default QuestionsPage
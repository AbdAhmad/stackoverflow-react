import React, { useState, useEffect, useContext } from 'react'
import { Button, Row, Col, Container, Alert } from 'react-bootstrap'
import CreatedInfo from '../components/CreatedInfo';
import {
    Link
} from "react-router-dom";
import AuthContext from '../context/AuthContext'
import useAxios from '../utils/useAxios'

import '../App.css'
import '../css/questionsPage.css'


const QuestionsPage = () => {

    const {authTokens, nFormatter, show, alertType, alertMsg, setShow} = useContext(AuthContext)

    const api = useAxios()

    const baseUrl = 'http://127.0.0.1:8000'

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

    useEffect(() => {
        getQuestions()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    
    const latestQuestions = async () => {
        const response = await api.get(`${baseUrl}/question?q=latest`)
        const data = await response['data']
        const questions = await data['questions']
        const viewBy = await data['question_order']
        setQuestions(questions)
        setQuestionOrder(viewBy)
    }

    
    return (
       
        <Container>
            { show ?

            <Alert variant={alertType} onClose={() => setShow(false)} dismissible>{alertMsg}</Alert>
            : 
            null
            }
        
            <div className="firstDiv">
                <h3>Questions</h3>
                <Link to="/ask"><Button variant="primary">Ask</Button></Link>
            </div>
            <nav className='navStyle'>
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

                { questions.map(question => (
                
                <Row style={{marginTop: "1%"}} key={question.id}>
                    <Col>
                        <div className="text-center VAVDivStyle">
                            <div style={{color: question.votes > 0 ? "green": question.votes < 0 ? "red": "grey", flex: "0.3"}}>{question.votes}<br/>Votes</div>
                            <div style={{color: question.ans_count > 0 ? "#CC6600": "grey", flex: "0.3"}}>{question.ans_count}<br/>Answers</div>
                            <div style={{color: question.views > 999 ? "#4C0099": "black", flex: "0.3"}}>{nFormatter(question.views)}<br/>Views</div> 
                        </div>
                    </Col>
                    <Col md={8}>
                        <div>
                            <h5><Link style={{textDecoration: "none"}} to={`/question/${question.slug}`}>{question.title}</Link></h5>
                        </div>
                        
                        {/* Question Tags */}

                        <div>
                        { question.tags.split(/\s+/).map((tag, index) => (
                                <button key={index} className="btn-block btn btn-outline-primary btn-sm tagButton">{tag}</button>
                            ))
                        }
                        </div> 
                        <div className='info-div'>
                            <CreatedInfo user={question.user} time={question.created_at} />
                        </div>
                    </Col>
                    <hr/>
                </Row>
            ))}
        </Container>
    )
}

export default QuestionsPage
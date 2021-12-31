import React, { useState, useEffect, useContext } from 'react'
import { Button, Card, Row, Col, Container } from 'react-bootstrap'
import ObjectInfo from '../components/ObjectInfo';
import {
    Link, 
} from "react-router-dom";
import AuthContext from '../context/AuthContext'


const QuestionsPage = () => {

    const {authTokens} = useContext(AuthContext)

    const myStyle = {
        display: "flex", 
        justifyContent: "space-between",
        marginTop: "4%"
    }

    const navStyle = {
        marginTop: "1%", 
        marginLeft: "42.5%"
    }

    const VAVStyle = {
        flex: "0.3"
    }

    const VAVDivStyle = {
        height: "120px", 
        display: "flex", 
        flexDirection: "row", 
        justifyContent: "center", 
        alignItems: "center"
    }


    useEffect(() => {
        getQuestions()
    }, [])


    let [questions, setQuestions] = useState([])
    let [questionOrder, setQuestionOrder] = useState('')

    let getQuestions = async () => {
        let response = await fetch('http://127.0.0.1:8000/question/',{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        let data = await response.json()
        let questions = data['questions']
        let viewBy = data['question_order']
        setQuestions(questions)
        setQuestionOrder(viewBy)
    }

    
    let viewQuesByLatest = async () => {
        let response = await fetch('http://127.0.0.1:8000/question?q=latest',{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        console.log(response)
        let data = await response.json()
        console.log(data)
        let questions = data['questions']
        let viewBy = data['question_order']
        setQuestions(questions)
        setQuestionOrder(viewBy)
    }

    
    return (
       
        <Container >
            
        <div style={myStyle}>
            <h3>Questions</h3>
            <Link to="/ask"><Button variant="primary">Ask</Button></Link>
        </div>

        <nav style={navStyle}>
       
            <ul className="pagination pagination-sm"> 
                { 
                    questionOrder === 'latest' ? 
                    <React.Fragment>
                        <div onClick={viewQuesByLatest}>
                            <li className="page-item active"><Link className="page-link" to="?q=latest">Latest</Link></li>
                        </div>
                        <li className="page-item"><Link className="page-link" to="?q=mostviewed">Most viewed</Link></li>
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <div onClick={viewQuesByLatest}>
                            <li className="page-item"><Link className="page-link" to="?q=latest">Latest</Link></li>
                        </div>    
                        <div onClick={getQuestions}>                    
                            <li className="page-item active"><Link className="page-link" to="?q=mostviewed">Most viewed</Link></li>
                        </div>
                    </React.Fragment>
                }
            </ul>
     
        </nav>
        
        <Card>
      
            {questions.map((question, index) => (
               
                <Row style={{marginTop: "1%"}}>
                <Col>
                    <div style={VAVDivStyle} className="text-center">
                        <div style={VAVStyle}>{question.votes}<br/>Votes</div>
                        <div style={VAVStyle}>{question.ans_count}<br/>Answers</div>
                        <div style={VAVStyle}>{question.views}<br/>Views</div> 
                    </div>
                </Col>
                <Col md={8}>
                    <div style={{display: "flex"}}>
                        <h5><Link key={index} style={{textDecoration: "none"}} to={`/question/${question.slug}`}>{question.title}</Link></h5>
                    </div>
                    {question.tags.split(/\s+/).map((tag) => (
                        <div style={{display: "inline-block"}}>
                            <button style={{marginLeft: "1px"}} className="btn-block btn btn-outline-primary btn-sm">{tag}</button>
                        </div> 
                        ))
                    }
                    <div style={{float: "right", paddingRight: "2%"}}>
                        <ObjectInfo user={question.user} time={question.created_at} />
                    </div>
                </Col>
                <hr/>
                </Row>

            ))}

        </Card>
        </Container>
    )
}

export default QuestionsPage
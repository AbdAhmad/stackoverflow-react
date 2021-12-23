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

    const [questions, setQuestions] = useState([])
    const [questionOrder, setQuestionOrder] = useState('')

    let getQuestions = async () => {
        let response = await fetch('http://127.0.0.1:8000/question/',{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        let data = await response.json()
       
        setQuestionOrder(data['marked'])
        // data.map((question) => {
        //     console.log(question)
        // })
        setQuestions(data['questions_list'])

        questions.map((question) => {
            
            question[4].split().forEach((tag) => {
                console.log(tag.split())
                [tag].map((t) => {
                    console.log(t)
                })
                
            })
           
            // question[4].split().map((tag) => {
            //     tag.map((t) => {
            //         console.log(t)
            //     })
            
        })
        
    }

    useEffect(() => {
        getQuestions()
    }, [])
    

    return (
       
        <Container >
            
        <div style={myStyle}>
            <h3>Questions</h3>
            <Link to="/ask"><Button variant="primary">Ask</Button></Link>
        </div>
        <nav style={navStyle}>
            <ul  className="pagination pagination-sm"> 
                <li className="page-item active"><Link className="page-link" to="?q=latest">Latest</Link></li>
                <li className="page-item"><Link className="page-link" to="?q=mostviewed">Most viewed</Link></li>
            </ul>
        </nav>
        <Card>
      
            {questions.map((question, index) => (
               
                <Row style={{marginTop: "1%"}}>
                <Col>
                    <div style={VAVDivStyle} className="text-center">
                        <div style={VAVStyle}>{question[2]}<br/>Votes</div>
                        <div style={VAVStyle}>{question[1]}<br/>Answers</div>
                        <div style={VAVStyle}>{question[3]}<br/>Views</div>    
                    </div>
                </Col>
                <Col md={8}>
                    <div style={{display: "flex"}}>
                        <h5><Link key={index} style={{textDecoration: "none"}} to="/question">{question[0]}</Link></h5>
                    </div>
                    <div style={{display: "flex"}}>
                        {question[4].split().map((tag) => (
                            <button style={{marginLeft: "1px"}} className="btn-block btn btn-outline-primary btn-sm">{tag}</button>
                        ))}
                    </div>
                    <div style={{float: "right", paddingRight: "2%"}}>
                        <ObjectInfo/>
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
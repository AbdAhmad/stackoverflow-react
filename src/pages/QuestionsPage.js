import React, { useState, useEffect, useContext } from 'react'
import { Button, Card, Row, Col, Container } from 'react-bootstrap'
import ObjectInfo from '../components/ObjectInfo';
import {
    Link, 
    useParams
} from "react-router-dom";
import AuthContext from '../context/AuthContext'


const QuestionsPage = () => {

    const {authTokens} = useContext(AuthContext)

    const {search} = useParams()

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
        if(search){
            getSearchedQues()
        }else{
            getQuestions()
        }
    }, [])

 
    let [questions, setQuestions] = useState([])
    let [questionOrder, setQuestionOrder] = useState('')
    let [areQuestions, setAreQuestions] = useState(false)

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
        setAreQuestions(true)
    }


    let getSearchedQues = async () => {
        let response = await fetch(`http://127.0.0.1:8000/searched_ques/${search}`,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        if(response.status === 200){
            let data = await response.json()
            let questions = data['questions']
            console.log(questions)
            let viewBy = data['question_order']
            setQuestions(questions)
            setQuestionOrder(viewBy)
            setAreQuestions(true)
        }
        
    }

    // useEffect(getQuestions, [])
    
    let viewQuesByLatest = async () => {
        let response = await fetch('http://127.0.0.1:8000/question?q=latest',{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })

        let data = await response.json()
        console.log(data)
        let questions = data['questions']
        let viewBy = data['question_order']
        setQuestions(questions)
        setQuestionOrder(viewBy)
        setAreQuestions(true)
    }

    
    return (
       
        <Container >
            
        <div style={myStyle}>
            <h3>Questions</h3>
            <Link to="/ask"><Button variant="primary">Ask</Button></Link>
        </div>

        { areQuestions ?
            <nav style={navStyle}>
                <ul className="pagination pagination-sm"> 
                    <>
                    <div onClick={viewQuesByLatest}>
                        <li className={`page-item ${questionOrder === 'latest'? 'active': null}`}><Link className="page-link" to="?q=latest">Latest</Link></li>
                    </div>
                    <div onClick={getQuestions}>
                        <li className={`page-item ${questionOrder !== 'latest'? 'active': null}`}><Link className="page-link" to="?q=mostviewed">Most viewed</Link></li>
                    </div>
                    </>
                </ul>
            </nav>
            :
            null   
        }
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
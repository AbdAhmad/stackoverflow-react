import React, { useState, useEffect, useContext } from 'react'

import { Button, Card, Row, Col, Container } from 'react-bootstrap'

import {
    Link, 
    useParams
} from "react-router-dom";

import AuthContext from '../context/AuthContext'
import CreatedInfo from '../components/CreatedInfo';
import { ReactComponent as MagnifyingGlass } from '../assets/MagnifyingGlass.svg'


const SearchedQuesPage = () => {

    const {authTokens} = useContext(AuthContext)
    const {search} = useParams()


    useEffect(() => {
        getSearchedQues()
    }, [])

 
    const [searchedQuestions, setSearchedQuestions] = useState([])


    const getSearchedQues = async () => {
        const response = await fetch(`http://127.0.0.1:8000/searched_ques/${search}`,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        if(response.status === 200){
            const data = await response.json()
            setSearchedQuestions(data)
        }
        else{
            setSearchedQuestions(null)
        }
    }


    const myStyle = {
        display: "flex", 
        justifyContent: "space-between",
        marginTop: "4%"
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


    return (
        <Container >
            <div style={myStyle}>
                <h3>Questions</h3>
                <Link to="/ask"><Button variant="primary">Ask</Button></Link>
            </div>

            {/* If Question(s) not found */}

            { !searchedQuestions ?
            
            <React.Fragment>
                <MagnifyingGlass />
                <br/>
                <br/>
                <h4>We couldn't find anything for <strong>{search}</strong></h4>
                <h5>Try different or less specific keywords</h5>
                <h5>Browse our <Link style={{textDecoration: "none"}} to="/questions">questions</Link></h5>
            </React.Fragment>
            :
            <Card>

            {/* If Question(s) found */}
      
            { searchedQuestions.map(question => (
               
                <Row style={{marginTop: "1%"}} key={question.id}>
                    <Col>
                        <div style={VAVDivStyle} className="text-center">
                            <div style={VAVStyle}>{question.votes}<br/>Votes</div>
                            <div style={VAVStyle}>{question.ans_count}<br/>Answers</div>
                            <div style={VAVStyle}>{question.views}<br/>Views</div> 
                        </div>
                    </Col>
                    <Col md={8}>
                        <div style={{display: "flex"}}>
                            <h5><Link style={{textDecoration: "none"}} to={`/question/${question.slug}`}>{question.title}</Link></h5>
                        </div>

                        {/* Question Tags */}

                        {question.tags.split(/\s+/).map((tag, index) => (

                        <div style={{display: "inline-block"}} key={index}>
                            <button style={{marginLeft: "1px"}} className="btn-block btn btn-outline-primary btn-sm">{tag}</button>
                        </div> 
                            ))
                        }
                        <div style={{float: "right", paddingRight: "2%"}}>
                            <CreatedInfo user={question.user} time={question.created_at} />
                        </div>
                    </Col>
                    <hr/>
                </Row>
                ))}
            </Card>
        }
        </Container>
    )
}

export default SearchedQuesPage

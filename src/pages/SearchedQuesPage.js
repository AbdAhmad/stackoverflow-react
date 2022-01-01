import React, { useState, useEffect, useContext } from 'react'
import { Button, Card, Row, Col, Container } from 'react-bootstrap'
import CreatedInfo from '../components/CreatedInfo';
import {
    Link, 
    useParams
} from "react-router-dom";
import AuthContext from '../context/AuthContext'
import { ReactComponent as MagnifyingGlass } from '../assets/MagnifyingGlass.svg'

const SearchedQuesPage = () => {

    const {authTokens} = useContext(AuthContext)

    const {search} = useParams()

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


    useEffect(() => {
        getSearchedQues()
    }, [])

 
    let [searchedQuestions, setSearchedQuestions] = useState([])


    let getSearchedQues = async () => {
        let response = await fetch(`http://127.0.0.1:8000/searched_ques/${search}`,{
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${authTokens?.access}`
            },
        })
        if(response.status === 200){
            let data = await response.json()
            let questions = await data['questions']
            setSearchedQuestions(questions)
        
        }
        else{
            setSearchedQuestions(null)
        }
    }
    return (
        <Container >
            
        <div style={myStyle}>
            <h3>Questions</h3>
            <Link to="/ask"><Button variant="primary">Ask</Button></Link>
        </div>
        {
            !searchedQuestions ?
            <React.Fragment>
                <MagnifyingGlass />
                <h4>We couldn't find anything for <strong>{search}</strong></h4>
                <h5>Try different or less specific keywords</h5>
            </React.Fragment>
            :
            <Card>
      
            {searchedQuestions.map((question, index) => (
               
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

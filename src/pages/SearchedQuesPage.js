import React, { useState, useEffect, useContext } from 'react'

import { Row, Col, Container } from 'react-bootstrap'

import {
    Link, 
    useParams
} from "react-router-dom";

import AuthContext from '../context/AuthContext'
import CreatedInfo from '../components/CreatedInfo';
import { ReactComponent as MagnifyingGlass } from '../assets/MagnifyingGlass.svg'

import '../App.css'
import '../css/questionsPage.css'


const SearchedQuesPage = () => {

    const {authTokens} = useContext(AuthContext)
    const {search} = useParams()


    useEffect(() => {
        getSearchedQues()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

 
    const [searchedQuestions, setSearchedQuestions] = useState([])


    const getSearchedQues = async () => {
        const response = await fetch(`http://127.0.0.1:8000/searched_ques/${search}`,{
            headers:{
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



    return (
        <Container>
            <br/>

            {/* If Question(s) not found */}

            { !searchedQuestions ?
            
            <React.Fragment>
                <div><MagnifyingGlass /></div>
                <br/>
                <br/>
                <h4>We couldn't find anything for <strong>{search}</strong></h4>
                <h5>Try different or less specific keywords</h5>
                <h5>Browse our <Link style={{textDecoration: "none"}} to="/questions">questions</Link></h5>
            </React.Fragment>
            :
            <>

            {/* If Question(s) found */}
      
            { searchedQuestions.map(question => (
               
                <Row style={{marginTop: "1%"}} key={question.id}>
                    <Col>
                        <div className="text-center VAVDivStyle">
                            <div style={{color: question.votes > 0 ? "green": question.votes < 0 ? "red": "grey", flex: "0.3"}}>{question.votes}<br/>Votes</div>
                            <div style={{color: question.ans_count > 0 ? "green": "grey", flex: "0.3"}}>{question.ans_count}<br/>Answers</div>
                            <div style={{flex: "0.3"}}>{question.views}<br/>Views</div> 
                        </div>
                    </Col>
                    <Col md={8}>
                        <div style={{display: "flex"}}>
                            <h5><Link style={{textDecoration: "none"}} to={`/question/${question.slug}`}>{question.title}</Link></h5>
                        </div>

                        {/* Question Tags */}

                        {question.tags.split(/\s+/).map((tag, index) => (

                        <div className='quesTag' key={index}>
                            <button className="btn-block btn btn-outline-primary btn-sm tagButton">{tag}</button>
                        </div> 
                            ))
                        }
                        <div className='info-div'>
                            <CreatedInfo user={question.user} time={question.created_at} />
                        </div>
                    </Col>
                    <hr/>
                </Row>
                ))}
            </>
        }
        </Container>
    )
}

export default SearchedQuesPage

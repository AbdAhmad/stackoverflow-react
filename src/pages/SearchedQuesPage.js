import React, { useState, useEffect, useContext } from 'react'
import { Row, Col, Container } from 'react-bootstrap'
import {
    Link, 
    useParams
} from "react-router-dom";

import AuthContext from '../context/AuthContext'
import useAxios from '../utils/useAxios'
import CreatedInfo from '../components/CreatedInfo';
import { ReactComponent as MagnifyingGlass } from '../assets/MagnifyingGlass.svg'

import '../App.css'
import '../css/questionsPage.css'


const SearchedQuesPage = () => {

    const {authTokens} = useContext(AuthContext)
    const {search} = useParams()

    const api = useAxios()

    const baseUrl = 'http://127.0.0.1:8000'
 
    const [searchedQuestions, setSearchedQuestions] = useState([])

    document.title = 'Stack Overflow - Where Developers Learn, Share, &amp; Build Careers'

    const getSearchedQues = async () => {
        const response = await api.get(`${baseUrl}/searched_ques/${search}`)
        if(response.status === 200){
            const data = await response['data']
            setSearchedQuestions(data)   
        }
    }

    useEffect(() => {
        getSearchedQues()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            <br/>

            {/* If Question(s) not found */}

            { searchedQuestions.length === 0 ?
            
            <React.Fragment>
                <div><MagnifyingGlass /></div>
                <br/>
                <br/>
                <h4>We couldn't find anything for <strong>{search}</strong></h4>
                <h5>Try different or less specific keywords</h5>
                <h5>Browse our <Link style={{textDecoration: "none"}} to="/questions">questions</Link></h5>
            </React.Fragment>
            :
            <React.Fragment>

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
            </React.Fragment>
        }
        </Container>
    )
}

export default SearchedQuesPage

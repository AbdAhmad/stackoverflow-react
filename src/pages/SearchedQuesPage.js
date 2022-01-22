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

import Loader from '../components/Loader'


const SearchedQuesPage = () => {

    const { viewsFormatter,
            baseUrl } = useContext(AuthContext)

    const { search } = useParams()

    const api = useAxios()
 
    const [searchedQuestions, setSearchedQuestions] = useState([])
    const [isQuestions, setIsQuestions] = useState(true)

    const [loading, setLoading] = useState(true)

    document.title = 'Stack Overflow - Where Developers Learn, Share, &amp; Build Careers'

    const getSearchedQues = async () => {
        const response = await api.get(`${baseUrl}/searched_ques/${search}`)
        if(response['data'].status === 404){
            setIsQuestions(false)
       
        }else if(response.status === 200){
            const data = await response['data']
            setSearchedQuestions(data)  
           
        } 
        setLoading(false)
    }

    useEffect(() => {
        getSearchedQues()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Container>
            { loading ?
            <Loader/>
        :
        <React.Fragment>
            <br/>

            {/* If Question(s) not found */}

            { !isQuestions ?
            
            <div className='text-center'>
                <div><MagnifyingGlass /></div>
                <br/>
                <br/>
                <h4>We couldn't find anything for <strong>{search}</strong></h4>
                <h5>Try different or less specific keywords</h5>
                <h5>Browse our <Link style={{textDecoration: "none"}} to="/questions">questions</Link></h5>
            </div>
            :
            <React.Fragment>

            {/* If Question(s) found */}
      
            { searchedQuestions.map(question => (
               
                <Row style={{marginTop: "1%"}} key={question.id}>
                    <Col>
                        <div className="text-center votes-ans-views-div">
                            <div style={{color: question.votes > 0 ? "#009900": question.votes < 0 ? "#FF3333": "#404040", flex: "0.3"}}>{question.votes}<br/>Votes</div>
                            <div style={{color: question.ans_count > 0 ? "#FF8000": "#404040", flex: "0.3"}}>{question.ans_count}<br/>Answers</div>
                            <div style={{color: question.views > 999 ? "#994C00": "#404040", flex: "0.3"}}>{viewsFormatter(question.views)}<br/>Views</div> 
                        </div>
                    </Col>
                    <Col md={8}>

                        <h5><Link style={{textDecoration: "none"}} to={`/question/${question.slug}`}>{question.title}</Link></h5>

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
                    <hr/>
                </Row>
                ))}
            </React.Fragment>
        }
        </React.Fragment>
        }
        </Container>
    )
}

export default SearchedQuesPage
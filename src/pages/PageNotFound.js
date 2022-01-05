import React from 'react'
import { Link } from 'react-router-dom'
import { ReactComponent as NotFound } from '../assets/NotFound.svg'

const PageNotFound = () => {
    return (
        <div>
            <NotFound />
            <h1>Page not found</h1>
            <h5>We're sorry, we couldn't find the page you requested.</h5>
            <h5>Browse our <Link style={{textDecoration: "none"}} to="/questions">questions</Link></h5>
            <h5><Link style={{textDecoration: "none"}} to="/ask">Ask</Link> a question</h5>
        </div>
    )
}

export default PageNotFound

import React, {useContext, useState} from 'react'
import { Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../context/AuthContext'

const Header = () => {

    let {user, logoutUser} = useContext(AuthContext)

    const [searchQues, setSearchQues] = useState('')

    const navigate = useNavigate()

    const profile = () => {
        navigate(`/profile/${user['username']}`)
    }

    return (
        <div  style={{marginBottom: "7.5%"}}>
            <nav className="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div className="container-fluid">

            {/* Stack Overflow Logo */}

            <Link to='/questions' className="navbar-brand">
                <svg aria-hidden="true" className="native svg-icon iconLogoGlyphMd" width="32" height="37" viewBox="0 0 32 37"><path d="M26 33v-9h4v13H0V24h4v9h22Z" fill="#BCBBBB"></path><path d="m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14 10.79.68-2.95-16.1-3.35L7 23l16.1 2.99ZM23 30H7v-3h16v3Z" fill="#F48024"></path></svg>
                <span className="-img _glyph">stack <b>overflow</b></span>
            </Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse justify-content-end navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ml-auto mb-2 mb-lg-0">

                {/* Search Box */}

                <Form action={`/questions/${searchQues}`} className="d-flex">
                    <input style={{width: "800px"}} onChange={e => setSearchQues(e.target.value)} className="form-control search me-2" autoComplete="off" type="search" placeholder="Search Question" aria-label="Search" />
                </Form>
                {user ?
                    <React.Fragment>

                    {/* User Button */}

                        <li className="nav-item">
                        {/* <a className="nav-link" href={`/profile/${user['username']}`}><button className="btn btn-success">{user['username']}</button></a> */}
                            <Link className="nav-link" to={`/profile/${user['username']}`}><button className="btn btn-success">{user['username']}</button></Link>
                            {/* <div onClick={profile}>
                                <button className="btn btn-success">{user['username']}</button>
                            </div> */}
                        </li>

                        {/* Log out Button */}

                        <li className="nav-item">
                            <Link className="nav-link" to="/login"><button onClick={logoutUser} className="btn btn-outline-primary">Log out</button></Link>
                        </li>   
                    </React.Fragment>
                    :
                    <React.Fragment>

                        {/* Sign up Button */}

                        <li className="nav-item">
                            <Link className="nav-link" to="/signup"><button className="btn btn-success">Sign up</button></Link>
                        </li>

                        {/* Login Button */}

                        <li className="nav-item">
                            <Link className="nav-link" to="/login"><button className="btn btn-primary">Log In</button></Link>
                        </li>
                    </React.Fragment>
                }

                </ul>
            </div>
            </div>
            </nav>
        </div>
    )
}

export default Header
import React, {useContext, useState} from 'react'
import { Form } from 'react-bootstrap'
import AuthContext from '../context/AuthContext'

const Header = () => {

    let {user, logoutUser} = useContext(AuthContext)

    const [searchQues, setSearchQues] = useState('')
    console.log(searchQues)

    return (
        <div  style={{marginBottom: "7.5%"}}>
            <nav class="navbar navbar-expand-lg navbar-light bg-light fixed-top">
            <div class="container-fluid">
            <a class="navbar-brand" href="/questions">
                <svg aria-hidden="true" class="native svg-icon iconLogoGlyphMd" width="32" height="37" viewBox="0 0 32 37"><path d="M26 33v-9h4v13H0V24h4v9h22Z" fill="#BCBBBB"></path><path d="m21.5 0-2.7 2 9.9 13.3 2.7-2L21.5 0ZM26 18.4 13.3 7.8l2.1-2.5 12.7 10.6-2.1 2.5ZM9.1 15.2l15 7 1.4-3-15-7-1.4 3Zm14 10.79.68-2.95-16.1-3.35L7 23l16.1 2.99ZM23 30H7v-3h16v3Z" fill="#F48024"></path></svg>
                <span class="-img _glyph">stack <b>overflow</b></span>
            </a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse justify-content-end navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav ml-auto mb-2 mb-lg-0">
                <Form action={`/questions/${searchQues}`} class="d-flex">
                    <input style={{width: "800px"}} onChange={e => setSearchQues(e.target.value)} class="form-control search me-2" autocomplete="off" type="search" placeholder="Search Question" aria-label="Search" />
                </Form>
                {user ?
                    <>
                        <li class="nav-item">
                            <a class="nav-link" href={`/profile/${user['username']}`}><button class="btn btn-success">{user['username']}</button></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/login"><button onClick={logoutUser} class="btn btn-outline-primary">Log out</button></a>
                        </li>   
                    </>
                    :
                    <>
                        <li class="nav-item">
                            <a class="nav-link" href="/signup"><button class="btn btn-success">Sign up</button></a>
                        </li>
                        <li class="nav-item">
                            <a class="nav-link" href="/login"><button class="btn btn-primary">Log In</button></a>
                        </li>
                    </>
                }

                </ul>
            </div>
            </div>
            </nav>
        </div>
    )
}

export default Header
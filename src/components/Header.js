import React, {useContext,} from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'

import AuthContext from '../context/AuthContext'

import StackoverflowLogo  from './StackoverflowLogo'
import SearchForm  from './SearchForm'
import UserButton from './UserButton'
import LogoutButton from './LogoutButton'
import SignupButton from './SignupButton'
import LoginButton from './LoginButton'

import '../App.css'


const Header = () => {

    const { user } = useContext(AuthContext)

    return (
        <Navbar sticky="top" bg='light' expand="lg">
            <Navbar.Brand><StackoverflowLogo/></Navbar.Brand>        
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse className='justify-content-end' id="navbarScroll">  
            <Nav>         
                { user ?
                    <React.Fragment>
                        <div className='header-box'>
                            <SearchForm/>
                            <Nav.Item><UserButton/></Nav.Item>
                            <Nav.Item><LogoutButton/></Nav.Item>
                        </div>                    
                    </React.Fragment>
                    :
                    <React.Fragment>
                        <Nav.Item><SignupButton/></Nav.Item>
                        <Nav.Item><LoginButton/></Nav.Item>
                    </React.Fragment>
                }
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    )
}

export default Header
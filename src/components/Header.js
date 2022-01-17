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
        
        <Container>

            <Navbar.Brand><StackoverflowLogo/></Navbar.Brand>
        
            <Navbar.Toggle aria-controls="navbarScroll" />

            <Navbar.Collapse className='justify-content-end' id="navbarScroll">         

            <Nav as="ul">         

                { user ?

                    <React.Fragment>

                        <SearchForm/>

                        <Nav.Item as="li"><UserButton/></Nav.Item>

                        <Nav.Item as="li"><LogoutButton/></Nav.Item>
                    
                    </React.Fragment>
                    :
                    <React.Fragment>
                    
                        <Nav.Item as="li"><SignupButton/></Nav.Item>
                    
                        <Nav.Item as="li"><LoginButton/></Nav.Item>
                
                    </React.Fragment>
                }

                </Nav>

            </Navbar.Collapse>

            </Container>

        </Navbar>

    )
}

export default Header
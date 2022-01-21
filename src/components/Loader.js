import React from 'react';
import { Container } from 'react-bootstrap';

import '../App.css'
import '../css/loader.css'

const Loader = () => {
  return (
    <Container className='loader-container'>
      <div className="loader"></div>
    </Container>
  )
};

export default Loader;

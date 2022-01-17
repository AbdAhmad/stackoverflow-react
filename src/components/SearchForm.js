import React, { useState } from 'react'
import { Form } from 'react-bootstrap'

const SearchForm = () => {

    const [searchQues, setSearchQues] = useState('')

    return (

        <Form action={`/questions/${searchQues}`} className="d-flex">
            <Form.Group>
                <Form.Control
                    onChange={e => setSearchQues(e.target.value)}
                    autoComplete="off" 
                    type="search" 
                    placeholder="Search Question" 
                    aria-label="Search"  
                    className='mb-3 mt-1'
                    style={{width: "100%"}}
                />
            </Form.Group>
        </Form>

    )
}

export default SearchForm

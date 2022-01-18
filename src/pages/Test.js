import React, {useState} from 'react'

const Test = () => {
  
 const [name, setname] = useState('')

    return (
      <div>
        <h1>{name}</h1>
        <input type='text' value={name} onChange={e => setname(e.target.value)}/>
      </div>
    );
}

export default Test

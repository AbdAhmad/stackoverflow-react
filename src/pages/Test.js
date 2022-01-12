import React, {useState, useEffect} from 'react'

const Test = () => {
    const [count, setCount] = useState(0);
    const [negativeCount, setNegativeCount] = useState(0);

    console.log('render')

    const increase = () => {
      setCount(count + 1)
    }

    const decrease = () => {
      setNegativeCount(negativeCount - 1)
    }


    // Similar to componentDidMount and componentDidUpdate:
    useEffect(() => {
      console.log('inside useEffect')
      // Update the document title using the browser API
      document.title = 'Test';
    }, []);
  
    return (
      <div>
        <p>You clicked {count} {negativeCount} times</p>
        <button onClick={increase}>
          {count}
        </button>
        <button onClick={decrease}>
          {negativeCount}
        </button>
      </div>
    );
}

export default Test

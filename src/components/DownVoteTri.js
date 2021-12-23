import React from 'react'
import { Link } from 'react-router-dom'

const DownVoteTri = (props) => {

    const triangleDown = {
        width: "0",
        height: "0",
        border: "solid 22px",
        borderColor:  "rgb(158, 149, 149) transparent  transparent  transparent"
    }

    return (
        <div>
            <Link to={`/${props.signup}`}><div style={triangleDown} className="triangle-down"></div></Link>
        </div>
    )
}

export default DownVoteTri
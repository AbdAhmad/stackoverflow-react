import React from 'react'
import { Link } from 'react-router-dom'

const CreatedInfo = (props) => {
    return (
        <div>
            <small>Asked on <strong> {props.time} by <Link style={{textDecoration: "none"}} to={`/profile/${props.user}`}>{props.user}</Link></strong></small>
        </div>
    )
}

export default CreatedInfo

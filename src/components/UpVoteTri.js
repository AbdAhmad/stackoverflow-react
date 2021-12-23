import React from 'react'
import { Link } from 'react-router-dom'

const UpVoteTri = (props) => {

    const triangleUp = {
        width: "0",
        height: "0",
        border: "solid 22px",
        borderColor:  "transparent  transparent rgb(158, 149, 149) transparent"
    }

    return (
        <div>
            <Link to={`/${props.login}`}><div style={triangleUp} className="triangle-up"></div></Link>
        </div>
    )
}

export default UpVoteTri
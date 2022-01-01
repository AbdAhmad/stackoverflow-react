import React from 'react'

const UpVoteTri = () => {

    const triangleUp = {
        width: "0",
        height: "0",
        border: "solid 22px",
        borderColor:  "transparent  transparent rgb(158, 149, 149) transparent"
    }

    return (
        <div>
            <div style={triangleUp} className="triangle-up"></div>
        </div>
    )
}

export default UpVoteTri
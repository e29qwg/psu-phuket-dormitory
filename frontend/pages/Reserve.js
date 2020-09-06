import React from 'react'

const Reserve = () => {
    const Building = () => {
        return (
            <div className="building-container">
                <div className="left">left</div>
                <div className="right">right</div>
            </div>
        )
    }
    return (
        <div className="reserve-container">
            <Building />
        </div>
    )
}
export default Reserve
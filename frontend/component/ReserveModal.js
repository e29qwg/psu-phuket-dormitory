import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Reserve = () => {

    const floorList = [
        { 1: ["A", "E"] },
        { 2: ["B", "F"] },
        { 3: ["C", "G"] },
        { 4: ["D", "H"] }
    ]

    const [FocusRoomList, setFocusListRoom] = useState([])
    const [showbuilding, setShowBuilding] = useState([])

    const handleSelectFloor = async floor => {
        setShowBuilding(floor)
        let floorDetails = []
        try {
            floor.map(async (section, key) => {
                const roomList = await axios.get(`http://localhost/student/room/floor${section}`)
                floorDetails[key] = { ...roomList.data.result }
                setFocusListRoom(floorDetails)
            })
        }
        catch (e) {
            console.error(e)
        }
    }

    const Building = () => {
        const left = showbuilding[0]
        const right = showbuilding[1]
        return (
            <div className="building-container">
                <div className="left">{left}01-{left}16</div>
                <div className="sleft">{left}17-{left}24</div>
                <div className="center" onClick={handleSelectFloor}>center</div>
                <div className="right">{right}01-{right}16</div>
                <div className="sright">{right}17-{right}24</div>
            </div>
        )
    }

    const FocusRoom = () => {
        return (
            <div className="side-room">
                <div className="select-room">
                    {/* <div className="sel-left">left</div>
                    <div className="sel-sleft">sleft</div>
                    <div className="sel-center">center</div>
                    <div className="sel-right">right</div>
                    <div className="sel-sright">sright</div> */}
                </div>
            </div>
        )
    }

    useEffect(() => {
        handleSelectFloor(["A", "E"])
        setShowBuilding(["A", "E"])
    }, [])

    return (
        <div className="reserve-container">
            <div className="floor-select-container">
                <button onClick={() => console.log(FocusRoomList)}>Debug</button>
                {floorList.map((floor, key) =>
                    <div
                        value={floor}
                        key={key}
                        className="floor-select-block"
                        onClick={() => handleSelectFloor(floor[key + 1])}
                    >
                        {Object.keys(floor)}
                    </div>
                )}
            </div>
            <Building />
            <FocusRoom />
        </div>
    )
}
export default Reserve
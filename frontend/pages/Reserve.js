import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { LoginState } from '../utils/context'

const Reserve = () => {

    const floorList = [
        { 1: ["A", "E"] },
        { 2: ["B", "F"] },
        { 3: ["C", "G"] },
        { 4: ["D", "H"] }
    ]

    const [focusRoomList, setFocusListRoom] = useState([])
    const [showbuilding, setShowBuilding] = useState([])
    const [modalFloor, setModalFloor] = useState()
    const [showModal, setShowModal] = useState(false)
    const { AxiosConfig } = useContext(LoginState)
    const [axiosConfig, setAxiosConfig] = AxiosConfig

    const handleSelectFloor = async floor => {
        setShowBuilding(floor)
        let floorDetails = []
        try {
            const roomList = await axios.get(`http://localhost/student/room/floor${floor[0]}`, axiosConfig)
            floorDetails[0] = { ...roomList.data.result }

            const roomList2 = await axios.get(`http://localhost/student/room/floor${floor[1]}`, axiosConfig)
            floorDetails[1] = { ...roomList2.data.result }

            setFocusListRoom(floorDetails)
        }
        catch (e) {
            console.error(e)
        }
    }

    const handleFocusModal = () => {
        setShowModal(false)
    }

    const handleModalFloor = (section) => {
        let temp = []

        if (section === "l-1-16") {
            let i = 0
            while (i < 16) {
                temp.push(focusRoomList[0][i])
                i++
            }
        }

        if (section === "l-17-24") {
            let i = 16
            while (i < 24) {
                temp.push(focusRoomList[0][i])
                i++
            }
        }

        if (section === "r-1-16") {
            let i = 0
            while (i < 16) {
                temp.push(focusRoomList[1][i])
                i++
            }
        }

        if (section === "r-17-24") {
            let i = 17
            while (i < 24) {
                temp.push(focusRoomList[1][i])
                i++
            }
        }

        setModalFloor(temp)
        setShowModal(true)
    }

    const Building = () => {
        const left = showbuilding[0]
        const right = showbuilding[1]
        return (
            <div className="building-container">
                <div className="left" onClick={() => handleModalFloor("l-1-16")}>{left}01 - {left}16</div>
                <div className="sleft" onClick={() => handleModalFloor("l-17-24")}>{left}17 - {left}24</div>
                <div className="center">center</div>
                <div className="right" onClick={() => handleModalFloor("r-1-16")}>{right}01 - {right}16</div>
                <div className="sright" onClick={() => handleModalFloor("r-17-24")}>{right}17 - {right}24</div>
            </div>
        )
    }

    const FocusFloor = () => {
        const room = [
            {
                profileID: "",
                student1: {
                    id: 1,
                    name: "",
                    surname: "",
                    tel: "",
                    nickname: ""
                },
            },
        ]

        const oddRoom = modalFloor.filter((_item, key) => key % 2 !== 0)
        const evenRoom = modalFloor.filter((_item, key) => key % 2 === 0)

        return (
            <div className="focus-floor">
                <img src="icon/close.svg" alt="x" id="close" onClick={handleFocusModal} />
                <div className="modal-content">
                    <div className="even-room">
                        {oddRoom.map((room, key) =>
                            <div className="room-container">
                                <span className="even-room-item" key={key}>
                                    <span className="student1">
                                        <img src="/icon/male.svg" alt="person" className="person" />
                                    </span>
                                    <span className="student2">
                                        <img src="/icon/male.svg" alt="person" className="person" />
                                    </span>
                                </span>
                                {room.profileId}
                            </div>
                        )}
                    </div>
                    <span className="space" >ทางเดิน</span>
                    <div className="odd-room">
                        {evenRoom.map((room, key) =>
                            <div className="room-container">
                                <span className="odd-room-item" key={key}>
                                    <span className="student1">
                                        <img src="/icon/male.svg" alt="person" className="person" />
                                    </span>
                                    <span className="student2">
                                        <img src="/icon/male.svg" alt="person" className="person" />
                                    </span>
                                </span>
                                {room.profileId}
                            </div>
                        )}
                    </div>
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
                <button onClick={() => console.log(modalFloor)}>Debug</button>
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
            {showModal && <FocusFloor />}
            <button onClick={()=>console.log(axiosConfig)}>log</button>
        </div >
    )
}
export default Reserve
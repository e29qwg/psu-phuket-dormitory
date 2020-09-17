import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import { LoginState } from '../utils/context'
import Router from 'next/router'
import Loading from '../component/Loading'

const Reserve = () => {

    const { Modal, Token, AxiosConfig } = useContext(LoginState)
    const [axiosConfig] = AxiosConfig
    const [token, setToken] = Token
    const [showModal, setShowModal] = Modal
    const [showRoomSelect, setShowRoomSelect] = React.useState(false)
    const [isLoading, setIsLoading] = React.useState(false)

    const floorList = [
        { 1: ["A", "E"] },
        { 2: ["B", "F"] },
        { 3: ["C", "G"] },
        { 4: ["D", "H"] }
    ]

    const [focusRoomList, setFocusListRoom] = useState([])
    const [showbuilding, setShowBuilding] = useState([])
    const [modalFloor, setModalFloor] = useState([
        {
            profileId: null,
            student1: {
                id: 1,
                name: "",
                surname: "",
                tel: "",
                nickname: ""
            },
        },
    ])

    const verifyLogingIn = () => {
        if (!token) {
            setToken(sessionStorage.getItem('token'))
            Router.push('Login')
            setShowModal(true)
        }
    }

    const handleSelectFloor = async floor => {
        setShowBuilding(floor)
        let floorDetails = []
        setIsLoading(false)
        try {

            const roomList = await axios.get(`http://localhost/student/room/floor${floor[0]}`, axiosConfig)
            floorDetails[0] = { ...roomList.data.result }

            const roomList2 = await axios.get(`http://localhost/student/room/floor${floor[1]}`, axiosConfig)
            floorDetails[1] = { ...roomList2.data.result }

            setFocusListRoom(floorDetails)
            setIsLoading(true)
        }
        catch (e) {
            console.error(e)
        }
    }

    const handleFocusModal = () => {
        setShowRoomSelect(false)
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
        setShowRoomSelect(true)
    }

    const Building = () => {
        const left = showbuilding[0]
        const right = showbuilding[1]
        if (!isLoading)
            return (
                <div className="Loading">
                    <Loading />
                </div>
            )
        else return (
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

        const oddRoom = modalFloor.filter((_item, key) => key % 2 !== 0)
        const evenRoom = modalFloor.filter((_item, key) => key % 2 === 0)

        return (
            <div className="focus-floor">
                <img src="icon/close.svg" alt="x" id="close" onClick={handleFocusModal} />
                <div className="modal-content">
                    <div className="even-room">
                        {oddRoom.map((room, key) =>
                            <div className="room-container" key={key}>
                                <span className="even-room-item" >
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
                            <div className="room-container" key={key}>
                                <span className="odd-room-item">
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
        setShowBuilding(["A", "E"])
        verifyLogingIn()
        if (token) {
            handleSelectFloor(["A", "E"])
        }
        return () => {
            setShowBuilding(["A", "E"])
            if (token) {
                handleSelectFloor(["A", "E"])
            }
        }
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
            {showRoomSelect && <FocusFloor />}
            <button onClick={() => console.log(axiosConfig)}>AxiosConf</button>
            <button onClick={() => console.log(focusRoomList)}>LogRoom</button>
            <button onClick={() => console.log(axiosConfig)}>log</button>
        </div >
    )
}
export default Reserve
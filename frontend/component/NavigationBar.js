import React from 'react'
import Router from 'next/router'
import { LoginState } from '../utils/context'
import axios from 'axios'

const NavigationBar = () => {
    const { Token, Modal } = React.useContext(LoginState)
    const [token, setToken] = Token
    const [showModal, setShowModal] = Modal
    const [hamburgerMenu, setHamburgermenu] = React.useState(false)
    const ref = React.useRef()

    const hamburgerToggle = () => {
        setHamburgermenu(!hamburgerMenu)
        if (window.innerWidth < 500)
            ref.current.style.display !== 'flex' ? ref.current.style.display = 'flex' : ref.current.style.display = 'none'
    }

    const handleTabClose = () => {
        if (hamburgerMenu) setHamburgermenu(!hamburgerMenu)
        if (window.innerWidth < 500)
            ref.current.style.display = 'none';
    }

    const handleRoute = (url) => {
        Router.push(url)
    }

    const handleLogin = () => {
        if (LoginOrLogout() === "ลงชื่อเข้าใช้") setShowModal(true)
        if (LoginOrLogout() === "ออกจากระบบ") {
            setToken(null)
            localStorage ? localStorage.removeItem('token') : ""
            try {
                axios.delete(`http://localhost/logout/${token.token}`)
            } catch (e) {
                console.error(e)
            }
        }
    }

    const LoginOrLogout = () => {
        if (token === null) return "ลงชื่อเข้าใช้"
        else return "ออกจากระบบ"
    }

    React.useEffect(() => {
        localStorage.getItem("token") ? setToken(JSON.parse(localStorage.getItem("token"))) : ""
    }, [])

    return (
        <div className="root-navbar-container">
            {
                !hamburgerMenu && <div onClick={hamburgerToggle} className="hamburger-container">
                    <img className="hamburger" src="/icon/Hamburger_icon.svg.png" alt="Hambuger Menu" />
                </div>
            }
            {
                <div ref={ref} onClick={hamburgerToggle} className="navbar-container">
                    <span onClick={() => handleRoute('/')}>หน้าแรก</span>
                    <span onClick={() => handleRoute('Reserve')}>จองห้อง</span>
                    <span onClick={() => handleRoute('/')}>แจ้งซ่อม</span>
                    <span onClick={handleLogin}>{LoginOrLogout()}</span>
                </div>
            }
        </div>
    )
}

export default NavigationBar
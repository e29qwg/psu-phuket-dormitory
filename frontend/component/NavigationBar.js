import React from 'react'
import Router from 'next/router'
import { LoginState } from '../utils/context'
import axios from 'axios'

const NavigationBar = () => {
    const { MenuBar, Token, Modal, PreviousRoute } = React.useContext(LoginState)
    const [token, setToken] = Token
    const [showModal, setShowModal] = Modal
    const [menuBar, setMenuBar] = MenuBar
    const [previousRoute, setPreviousRoute] = PreviousRoute
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
        setPreviousRoute(url)
        if (url === "Reserve" || url === "Profile") {
            if (token)
                Router.push(url)
            else {
                Router.push("Login")
            }
        }
        else Router.push(url)
    }

    const handleLogin = () => {
        if (menuBar === "ลงชื่อเข้าใช้") setShowModal(true)
        if (menuBar === "ออกจากระบบ") {
            const tempToken = token ? token.token : sessionStorage ? sessionStorage.getItem("token") : ""
            setToken(null)
            sessionStorage.removeItem('token')
            setMenuBar('ลงชื่อเข้าใช้')
            try {
                axios.delete(`http://localhost/logout/${tempToken}`)
            } catch (e) {
                console.error(e)
            }
        }
    }

    const LoginOrLogout = () => {
        if (token || sessionStorage.getItem('token')) setMenuBar('ออกจากระบบ')
        else setMenuBar('ลงชื่อเข้าใช้')
    }

    React.useEffect(() => {
        LoginOrLogout()
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
                    <span onClick={() => handleRoute('Profile')}>ข้อมูลส่วนตัว</span>
                    <span onClick={handleLogin}>{menuBar}</span>
                </div>
            }
        </div>
    )
}

export default NavigationBar
import React from 'react'
import Router from 'next/router'
import { LoginState } from '../utils/Login'

const NavigationBar = () => {
    const [isLongin, setIsLogin] = React.useContext(LoginState)
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
        setIsLogin(!isLongin)
        console.log(isLongin)
    }

    const LoginOrLogout = () => {
        return isLongin ? "ออกจากระบบ" : "ลงชื่อเข้าใช้"
    }

    React.useEffect(() => {

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
            {/* <div onClick={handleTabClose}></div> */}
        </div>
    )
}

export default NavigationBar
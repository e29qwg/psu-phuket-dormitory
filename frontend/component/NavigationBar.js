import React from 'react'
import Router from 'next/router'

const NavigationBar = () => {
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
                    <span onClick={() => handleRoute('/')}>เกี่ยวกับเรา</span>
                    <span onClick={() => handleRoute('/')}>ติดต่อ</span>
                    <span onClick={() => handleRoute('Login')}>ลงชื่อเข้าใช้</span>
                </div>
            }
            {/* <div onClick={handleTabClose}></div> */}
        </div>
    )
}

export default NavigationBar
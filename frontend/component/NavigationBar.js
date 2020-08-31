import React from 'react'

const NavigationBar = ({ children }) => {
    const [hamburgerMenu, setHamburgermenu] = React.useState(false)
    const ref = React.useRef()
    const bodyRef = React.useRef()

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

    React.useEffect(() => {

    }, [])

    return (
        <div>
            {
                !hamburgerMenu && <div onClick={hamburgerToggle} className="hamburger-container">
                    <img className="hamburger" src="/icon/Hamburger_icon.svg.png" alt="Hambuger Menu" />
                </div>
            }
            {
                <div ref={ref} onClick={hamburgerToggle} className="navbar-container">
                    <span>หน้าแรก</span>
                    <span>บทความ</span>
                    <span>บริการ</span>
                    <span>เกี่ยวกับเรา</span>
                    <span>ติดต่อ</span>
                </div>
            }
            <div onClick={handleTabClose}>{children}</div>
        </div>
    )
}

export default NavigationBar
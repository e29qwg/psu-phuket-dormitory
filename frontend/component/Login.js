import React from 'react'
import axios from 'axios'
import qs from 'qs'
import { LoginState } from '../utils/context'

const Login = ({ children }) => {
    const { MenuBar, Token, Modal, AxiosConfig } = React.useContext(LoginState)
    const [token, setToken] = Token
    const [showModal, setShowModal] = Modal
    const [menuBar, setMenuBar] = MenuBar
    const [axiosConfig, setAxiosConfig] = AxiosConfig

    const [form, setForm] = React.useState({
        username: "",
        password: "",
        type: "Students"
    })

    const handleForm = (event) => {
        setForm({
            ...form,
            [event.target.name]: event.target.value
        })
    }

    const getAuthen = async () => {
        try {
            const result = await axios.post('http://localhost', qs.stringify(form), {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
            if (result.status === 200 && result.data.token) {
                sessionStorage.setItem('token', JSON.stringify(result.data))
                setShowModal(false)
                setToken(result.data)
                setAxiosConfig({
                    headers: {
                        authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token")).token}`,
                        type: result.data.type
                    }
                })
                setMenuBar('ออกจากระบบ')
            }
            else if (result.status === 401) {
                setToken(null)
            }
        } catch (e) {
            console.log(e)
        }
    }
    const handleEnter = e => {
        if (e.key === "Enter")
            getAuthen()
    }

    React.useEffect(() => {

    }, [])

    if (showModal) return (
        <>
            <div
                className="login-container"
                onKeyDown={handleEnter}
            >
                <div onClick={() => setShowModal(!showModal)}>
                    <img src="https://image.flaticon.com/icons/svg/271/271228.svg" alt="close login bar" />
                </div>
                <div className="login-form">
                    <label htmlFor="username">PSU Passport</label>
                    <input type="text" name="username" placeholder="username" onChange={handleForm} />
                    <label htmlFor="username">รหัสผ่าน</label>
                    <input type="password" name="password" placeholder="password" onChange={handleForm} />
                    <label htmlFor="สถานะ" className="status">สถานะ</label>
                    <select name="type" onChange={handleForm}>
                        <option value="Students">นักศึกษา</option>
                        <option value="Staff">เจ้าหน้าที่</option>
                        <option value="อาจารย์">อาจารย์</option>
                    </select>
                    <button onClick={getAuthen}>Login</button>
                </div>
            </div>
            {children}
            <style jsx>{`
                    .login-container {
                        background: #269CD4;
                        font-family: 'Sarabun', sans-serif;
                    }
                    .login-container > div:first-child, img:first-child {
                        grid-column: span 12;
                        width: 100%;
                        height: 2em;
                        cursor: pointer;
                        background: #6489BD;
                    }
                    .login-form > input, select, option{
                        border-radius: 10px;
                        height: 2em;
                        font-family: 'Sarabun', sans-serif;
                    }
                    .login-form > label {
                        margin: 2em 0 0 0;
                        font-family: 'Sarabun', sans-serif;
                    }
                    .login-form > button {
                        height: 3em;
                        background: #9BBD22;
                        border-radius: 10px;
                        margin: 5em 2px 2px 0;
                    }
            `}</style>
        </>
    )
    else return <div>{children}</div>
}

export default Login
import React from 'react'
import axios from 'axios'
import qs from 'qs'
import { LoginState } from '../utils/context'
import Router from 'next/router'

const Login = () => {
    const { MenuBar, Token, Modal, AxiosConfig, PreviousRoute } = React.useContext(LoginState)
    const [previousRoute] = PreviousRoute
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
                        authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token")).token}`
                    }
                })
                setMenuBar('ออกจากระบบ')
                if (previousRoute !== null) Router.push(previousRoute)
            }
            else if (result.status === 401) {
                setToken(null)
            }
        } catch (e) {
            console.log(e)
        }
    }

    const handleEnter = e => {
        if (e.key === "Enter") {
            getAuthen()
        }
    }

    React.useEffect(() => {
    }, [])

    return (
        <div className="login-page-container">
            <div className="force-login">กรุณาเข้าสู่ระบบ</div>
            <div className="login-form">
                <label htmlFor="username">PSU Passport</label>
                <input type="text" name="username" placeholder="username"
                    onChange={handleForm}
                    onKeyDown={handleEnter}
                />

                <input type="password" name="password" placeholder="password"
                    onChange={handleForm}
                    onKeyPress={handleEnter}
                />
                <label htmlFor="สถานะ" className="status">สถานะ</label>
                <select name="type" onChange={handleForm}>
                    <option value="Students">นักศึกษา</option>
                    <option value="Staff">เจ้าหน้าที่</option>
                    <option value="อาจารย์">อาจารย์</option>
                </select>
                <button onClick={getAuthen}>Login</button>
            </div>
        </div>
    )
}

export default Login
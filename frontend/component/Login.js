import React from 'react'
import axios from 'axios'
import qs from 'qs'
import { LoginState } from '../utils/context'

const Login = ({ children }) => {
    const { Token, Modal } = React.useContext(LoginState)
    const [token, setToken] = Token
    const [showModal, setShowModal] = Modal

    const [form, setForm] = React.useState({
        username: "",
        password: "",
        type: ""
    })

    const handleForm = (event) => {
        console.log(event.target.name)
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
            // const result = await axios.post('http://localhost', { username: "5835512119", password: "Ff_0813780670" })
            // setResponse(result.data)
            if (result.status === 200 && result.data.token) {
                setShowModal(false)
                setToken(result.data)
                localStorage.setItem('token', JSON.stringify(result.data))
                console.log("Token receive => " + result.data.token)
            }
            if (result.status === 200) {
                setShowModal(false)
                console.log("Loging in")
                if (localStorage) setToken(JSON.parse(localStorage.getItem('token')))
            }
            else if (result.status === 401) {
                setToken(null)
                console.log('Destroyed Token')
            }
        } catch (e) {
            console.log(e)
        }
    }

    React.useEffect(() => {
        console.log(token)
    }, [])

    if (showModal) return (
        <>
            <div className="login-container">
                <button onClick={() => setShowModal(!showModal)}>
                    <img src="https://image.flaticon.com/icons/svg/271/271228.svg" alt="close login bar" />
                </button>
                <div className="login-form">
                    <label htmlFor="username">PSU Passport</label>
                    <input type="text" name="username" placeholder="username" onChange={handleForm} />
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
        </>
    )
    else return <div>{children}</div>
}

export default Login
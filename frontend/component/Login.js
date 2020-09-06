import React from 'react'
import axios from 'axios'
import qs from 'qs'
import { LoginState } from '../utils/Login'

const Login = ({ children }) => {
    const [isLogin] = React.useContext(LoginState)
    const [form, setForm] = React.useState({
        username: "",
        password: ""
    })

    const [response, setResponse] = React.useState()

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
            setResponse(result.data)
            console.log(result.data)
        } catch (e) {
            console.log(e)
        }
    }

    React.useEffect(() => {

    }, [])

    if (isLogin) return (
        <>
            <div className="login-container">
                <div>{JSON.stringify(response)}</div>
                <div className="login-form">
                    <img src="https://image.flaticon.com/icons/svg/271/271228.svg" alt="close login bar" />
                    <label htmlFor="username">PSU Passport</label>
                    <input type="text" name="username" placeholder="username" onChange={handleForm} />
                    <input type="password" name="password" placeholder="password" onChange={handleForm} />
                    <label htmlFor="สถานะ" className="status">สถานะ</label>
                    <select name="สถานะ">
                        <option value="นักเรียน">นักเรียน</option>
                        <option value="เจ้าหน้าที่">เจ้าหน้าที่</option>
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
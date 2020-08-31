import React from 'react'
import axios from 'axios'
import qs from 'qs'

const Login = () => {

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

    return (
        <div className="login-container">
            <div>{JSON.stringify(response)}</div>
            <div className="login-form">
                <input type="text" name="username" onChange={handleForm} />
                <input type="password" name="password" onChange={handleForm} />
                <button onClick={getAuthen}>Login</button>
            </div>
        </div>
    )
}

export default Login
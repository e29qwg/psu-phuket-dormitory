import React from 'react'
import axios from 'axios'

const Index = () => {

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
        const result = await axios.post('http://localhost', "test")
        // setResponse(result.data)
        console.log(result.data)
    }

    React.useEffect(() => {

    }, [])

    return (
        <div className="container">
            <div>{JSON.stringify(response)}</div>
            <div className="form">
                <input type="text" name="username" onChange={handleForm} />
                <input type="password" name="password" onChange={handleForm} />
                <button onClick={() => getAuthen()}>Login</button>
            </div>
        </div>
    )
}

export default Index
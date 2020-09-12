import React from 'react'
import axios from 'axios'
import qs from 'qs'

const Index = () => {

    const [form, setForm] = React.useState({
        username: "",
        password: ""
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
            setResponse(result.data)
            console.log(result.data)
        } catch (e) {
            console.log(e)
        }
    }

    React.useEffect(() => {

    }, [])

    return (
        <div className="index-container">
            <img className="index-background" src='background/cover.jpg' alt="cover" />
        </div>
    )
}

export default Index
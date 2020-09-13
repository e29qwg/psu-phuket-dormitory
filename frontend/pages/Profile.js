import React from 'react'
import { LoginState } from '../utils/context'
import axios from 'axios'

const Profile = () => {

    const { AxiosConfig } = React.useContext(LoginState)
    const [axiosConfig] = AxiosConfig
    const [section, setSection] = React.useState(1)
    const [form, setForm] = React.useState({
        profile: {
            id: "",
            name: "",
            surname: "",
            nickname: "",
            religion: "",
            race: "",
            nationality: "",
            birthday: "",
            faculty: "",
            department: "",
            line: ""
        },
        contact: {
            tel: "",
            network: "",
            email: "",
            facebook: "",
            houseno: "",
            village: "",
            villageno: "",
            road: "",
            subdistrict: "",
            district: "",
            province: "",
            postalcode: ""

        },
        information: {
            school: "",
            county: "",
            gpa: "",
            plan: "",
            height: "",
            weight: "",
            blood: "",
            disease: "",
            drugallergy: ""
        },
        friend: {
            name: "",
            surname: "",
            nickname: "",
            tel: "",
            faculty: "",
            department: ""
        },
        family: {
            dad: {
                name: "",
                surname: "",
                age: "",
                career: "",
                workplace: "",
                position: "",
                income: "",
                tel: "",
                network: ""
            },
            mom: {
                name: "",
                surname: "",
                age: "",
                career: "",
                workplace: "",
                position: "",
                income: "",
                tel: "",
                network: ""
            },
            emergency: {
                name: "",
                surname: "",
                age: "",
                concerned: "",
                career: "",
                tel: "",
                network: ""
            },
            status: ""
        },
        other: {
            talent: "",
            character: "",
            position: ""
        }
    })

    const handleFormProfile = (e) => {
        setForm({
            ...form,
            profile: {
                ...form.profile,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleFormContact = (e) => {
        setForm({
            ...form,
            contact: {
                ...form.contact,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleFormInformation = (e) => {
        setForm({
            ...form,
            information: {
                ...form.information,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleFormFriend = (e) => {
        setForm({
            ...form,
            friend: {
                ...form.friend,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleFormFamily = {
        dad: (e) => {
            setForm({
                ...form,
                family: {
                    ...form.family,
                    dad: {
                        ...form.family.dad,
                        [e.target.name]: e.target.value
                    }
                }
            })
        },
        mom: (e) => {
            setForm({
                ...form,
                family: {
                    ...form.family,
                    mom: {
                        ...form.family.mom,
                        [e.target.name]: e.target.value
                    }
                }
            })
        },
        emergency: (e) => {
            setForm({
                ...form,
                family: {
                    ...form.family,
                    emergency: {
                        ...form.family.emergency,
                        [e.target.name]: e.target.value
                    }
                }
            })
        },
        status: (e) => {
            setForm({
                ...form,
                family: {
                    ...form.family,
                    status: {
                        ...form.family.status,
                        [e.target.name]: e.target.value
                    }
                }
            })
        }
    }

    const handleFormOther = (e) => {
        setForm({
            ...form,
            other: {
                ...form.other,
                [e.target.name]: e.target.value
            }
        })
    }

    const handleSubmit = (e) => {
        try {
            axios.post('', form, axiosConfig).then(res => {
                if (res.status === 200) {
                    console.log("Submit success")
                }
            })
        } catch (e) {
            console.log(e)
        }
    }

    const ProfileForm = () => {
        return <div>
            <label>Profile</label>
            <input name="id" onChange={handleFormProfile} />
            <input name="name" onChange={handleFormProfile} />
            <input name="surname" onChange={handleFormProfile} />
            <input name="nickname" onChange={handleFormProfile} />
            <input name="religion" onChange={handleFormProfile} />
            <input name="race" onChange={handleFormProfile} />
            <input name="nationality" onChange={handleFormProfile} />
            <input name="birthday" onChange={handleFormProfile} />
            <input name="faculty" onChange={handleFormProfile} />
            <input name="department" onChange={handleFormProfile} />
            <input name="line" onChange={handleFormProfile} />
            <button onClick={() => setSection(prev => prev + 1)}>Next</button>
        </div>
    }

    const Contact = () => {
        return <div>
            <label>Contact</label>
            <input name="tel" onChange={handleFormContact} />
            <input name="network" onChange={handleFormContact} />
            <input name="email" onChange={handleFormContact} />
            <input name="facebook" onChange={handleFormContact} />
            <input name="houseno" onChange={handleFormContact} />
            <input name="village" onChange={handleFormContact} />
            <input name="villageno" onChange={handleFormContact} />
            <input name="road" onChange={handleFormContact} />
            <input name="subdistrinct" onChange={handleFormContact} />
            <input name="district" onChange={handleFormContact} />
            <input name="province" onChange={handleFormContact} />
            <input name="postalcode" onChange={handleFormContact} />
            <button onClick={() => setSection(prev => prev - 1)}>Previous</button>
            <button onClick={() => setSection(prev => prev + 1)}>Next</button>
        </div>
    }

    const Information = () => {
        return <div>
            <label>Information</label>
            <input name="school" onChange={handleFormInformation} />
            <input name="country" onChange={handleFormInformation} />
            <input name="gpa" onChange={handleFormInformation} />
            <input name="plan" onChange={handleFormInformation} />
            <input name="height" onChange={handleFormInformation} />
            <input name="weight" onChange={handleFormInformation} />
            <input name="blood" onChange={handleFormInformation} />
            <input name="desease" onChange={handleFormInformation} />
            <input name="drugallergy" onChange={handleFormInformation} />
            <button onClick={() => setSection(prev => prev - 1)}>Previous</button>
            <button onClick={() => setSection(prev => prev + 1)}>Next</button>
        </div>
    }
    const Friend = () => {
        return <div>
            <label>Friends</label>
            <input name="name" onChange={handleFormFriend} />
            <input name="surname" onChange={handleFormFriend} />
            <input name="nickname" onChange={handleFormFriend} />
            <input name="tel" onChange={handleFormFriend} />
            <input name="faculty" onChange={handleFormFriend} />
            <input name="department" onChange={handleFormFriend} />
            <button onClick={() => setSection(prev => prev - 1)}>Previous</button>
            <button onClick={() => setSection(prev => prev + 1)}>Next</button>
        </div>
    }
    const Family = () => {
        return <div>
            <label>Family</label>
            dad
            <input name="name" onChange={handleFormFamily.dad} />
            <input name="surname" onChange={handleFormFamily.dad} />
            <input name="age" onChange={handleFormFamily.dad} />
            <input name="career" onChange={handleFormFamily.dad} />
            <input name="workplace" onChange={handleFormFamily.dad} />
            <input name="position" onChange={handleFormFamily.dad} />
            <input name="income" onChange={handleFormFamily.dad} />
            <input name="tel" onChange={handleFormFamily.dad} />
            <input name="network" onChange={handleFormFamily.dad} />

            mom
            <input name="name" onChange={handleFormFamily.mom} />
            <input name="surname" onChange={handleFormFamily.mom} />
            <input name="age" onChange={handleFormFamily.mom} />
            <input name="career" onChange={handleFormFamily.mom} />
            <input name="workplace" onChange={handleFormFamily.mom} />
            <input name="position" onChange={handleFormFamily.mom} />
            <input name="income" onChange={handleFormFamily.mom} />
            <input name="tel" onChange={handleFormFamily.mom} />
            <input name="network" onChange={handleFormFamily.mom} />

            emergency
            <input name="name" onChange={handleFormFamily.emergency} />
            <input name="surname" onChange={handleFormFamily.emergency} />
            <input name="age" onChange={handleFormFamily.emergency} />
            <input name="concerned" onChange={handleFormFamily.emergency} />
            <input name="career" onChange={handleFormFamily.emergency} />
            <input name="tel" onChange={handleFormFamily.emergency} />
            <input name="network" onChange={handleFormFamily.emergency} />
            <button onClick={() => setSection(prev => prev - 1)}>Previous</button>
            <button onClick={() => setSection(prev => prev + 1)}>Next</button>
        </div>
    }

    const Other = () => {
        return <div>
            <label>Other</label>
            <input name="talent" onChange={handleFormOther} />
            <input name="character" onChange={handleFormOther} />
            <input name="position" onChange={handleFormOther} />
            <button onClick={() => setSection(prev => prev - 1)}>Previous</button>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    }

    return (
        <div className="profile-container">
            <div className="profile-form">{section === 1 ? <ProfileForm /> : ""}</div>
            <div className="profile-form">{section === 2 ? <Contact /> : ""}</div>
            <div className="profile-form">{section === 3 ? <Information /> : ""}</div>
            <div className="profile-form">{section === 4 ? <Friend /> : ""}</div>
            <div className="profile-form">{section === 5 ? <Family /> : ""}</div>
            <div className="profile-form">{section === 6 ? <Other /> : ""}</div>
            {/* <button onClick={() => console.log(form)}>log form</button> */}
        </div>
    )
}

export default Profile
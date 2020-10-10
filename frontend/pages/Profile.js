import React, { useState } from 'react'
import { LoginState } from '../utils/context'
import axios from 'axios'


const Profile = () => {

    const { AxiosConfig, Token } = React.useContext(LoginState)
    const [axiosConfig, setAxiosConfig] = AxiosConfig
    const [_token, setToken] = Token
    const [section, setSection] = React.useState(1)
    const [stepBackground, setStepBackground] = useState({ 1: "", 2: "", 3: "", 4: "", 5: "" })
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
        const { id } = JSON.parse(sessionStorage.getItem('token'))

        try {
            axios.post(`http://localhost/student/profile/${id}`, form, axiosConfig).then(res => {
                if (res.status === 200) {
                    console.log("Submit success")
                }
            })
        } catch (e) {
            console.error(e)
            Logout()
        }
    }
    const Logout = () => {
        setToken(null)
        sessionStorage.removeItem('token')
        setShowModal(false)
        setMenuBar('ลงชื่อเข้าใช้')
        Router.push('Login')
    }

    const getHeader = () => {
        if (sessionStorage.getItem('token')) {
            setToken(JSON.parse(sessionStorage.getItem('token')))
            setAxiosConfig({
                headers: {
                    authorization: `Bearer ${JSON.parse(sessionStorage.getItem("token")).token}`,
                    type: JSON.parse(sessionStorage.getItem('token')).type
                }
            })
        }
        else Logout()
    }

    const verifyLogin = () => {
        const session = sessionStorage.getItem("token")
        if (!session) {
            sessionStorage.removeItem('token')
            setToken(null)
            setShowModal(false)
            setMenuBar('ลงชื่อเข้าใช้')
            Router.push('Login')
        }
    }

    React.useEffect(() => {
        verifyLogin()
        getHeader()
    }, [])

    const ProfileForm = () => {
        return <div>
            {Step()}
            <h2>ข้อมูลเบื้องต้น</h2>
            <label>รหัสนักศึกษา</label>
            <input value={form.profile.id} name="id" onChange={handleFormProfile} />
            <label>ชื่อจริง</label>
            <input value={form.profile.name} name="name" onChange={handleFormProfile} />
            <label>นามสกุล</label>
            <input value={form.profile.surname} name="surname" onChange={handleFormProfile} />
            <label>ชื่อเล่น</label>
            <input value={form.profile.nickname} name="nickname" onChange={handleFormProfile} />
            <label>ศาสนา</label>
            <input value={form.profile.religion} name="religion" onChange={handleFormProfile} />
            <label>สัญชาติ</label>
            <input value={form.profile.race} name="race" onChange={handleFormProfile} />
            <label>เชื่อชาติ</label>
            <input value={form.profile.nationality} name="nationality" onChange={handleFormProfile} />
            <label>วัน/เดือน/ปีเกิด</label>
            <input value={form.profile.birthday} name="birthday" onChange={handleFormProfile} />
            <label>คณะ</label>
            <input value={form.profile.faculty} name="faculty" onChange={handleFormProfile} />
            <label>สาขา/ภาควิชา</label>
            <input value={form.profile.department} name="department" onChange={handleFormProfile} />
            <label>Line ID</label>
            <input value={form.profile.line} name="line" onChange={handleFormProfile} />
            <button onClick={() => {
                setSection(prev => prev + 1)
                setStep(section)
            }}>หน้าถัดไป</button>
        </div>
    }

    const Contact = () => {
        return <div>
            {Step()}
            <h2>ข้อมูลติดต่อ</h2>
            <label>เบอร์โทรศัพท์</label>
            <input name="tel" onChange={handleFormContact} />
            <label>อีเมล์</label>
            <input name="email" onChange={handleFormContact} />
            <label>ชื่อ Facebook</label>
            <input name="facebook" onChange={handleFormContact} />
            <label>ที่อยู่</label>
            <input name="network" onChange={handleFormContact} />
            <label>บ้านเลขที่</label>
            <input name="houseno" onChange={handleFormContact} />
            <label>หมู่บ้าน</label>
            <input name="village" onChange={handleFormContact} />
            <label>หมู่ที่</label>
            <input name="villageno" onChange={handleFormContact} />
            <label>ถนน</label>
            <input name="road" onChange={handleFormContact} />
            <label>ตำบล</label>
            <input name="subdistrinct" onChange={handleFormContact} />
            <label>อำเภอ</label>
            <input name="district" onChange={handleFormContact} />
            <label>จังหวัด</label>
            <input name="province" onChange={handleFormContact} />
            <label>รหัสไปรษณีย์</label>
            <input name="postalcode" onChange={handleFormContact} />
            <button onClick={() => {
                setSection(prev => prev - 1)
                setStep(section)
            }}>หน้าที่แล้ว</button>
            <button onClick={() => {
                setSection(prev => prev + 1)
                setStep(section)
            }}>หน้าถัดไป</button>
        </div>
    }

    const Information = () => {
        return <div>
            {Step()}
            <h2>ข้อมูลการศึกษา</h2>
            <label>จบจากโรงเรียน</label>
            <input name="school" onChange={handleFormInformation} />
            <label>จังหวัด</label>
            <input name="country" onChange={handleFormInformation} />
            <label>เกรดเฉลี่ย</label>
            <input name="gpa" onChange={handleFormInformation} />
            <label>แผนการศึกษา</label>
            <input name="plan" onChange={handleFormInformation} />
            <label>ส่วนสูง(ซ.ม.)</label>
            <input name="height" onChange={handleFormInformation} />
            <label>น้ำหนัก(ก.ก.)</label>
            <input name="weight" onChange={handleFormInformation} />
            <label>กรุ๊บเลือด</label>
            <input name="blood" onChange={handleFormInformation} />
            <label>โรคประจำตัว</label>
            <input name="desease" onChange={handleFormInformation} />
            <label>แพ้ยา</label>
            <input name="drugallergy" onChange={handleFormInformation} />
            <button onClick={() => {
                setSection(prev => prev - 1)
                setStep(section)
            }}>หน้าที่แล้ว</button>
            <button onClick={() => {
                setSection(prev => prev + 1)
                setStep(section)
            }}>หน้าถัดไป</button>
        </div>
    }

    const Friend = () => {
        return <div>
            {Step()}
            <h2>เพื่อนสนิท</h2>
            <label>ชื่อจริง</label>
            <input name="name" onChange={handleFormFriend} />
            <label>นามสกุล</label>
            <input name="surname" onChange={handleFormFriend} />
            <label>ชื่อเล่น</label>
            <input name="nickname" onChange={handleFormFriend} />
            <label>เบอร์โทร</label>
            <input name="tel" onChange={handleFormFriend} />
            <label>คณะ</label>
            <input name="faculty" onChange={handleFormFriend} />
            <label>สาขา/ภาควิชา</label>
            <input name="department" onChange={handleFormFriend} />
            <button onClick={() => {
                setSection(prev => prev - 1)
                setStep(section)
            }}>หน้าที่แล้ว</button>
            <button onClick={() => {
                setSection(prev => prev + 1)
                setStep(section)
            }}>หน้าถัดไป</button>
        </div>
    }

    const Family = () => {
        return <div>
            {Step()}
            <h2>ข้อมูลเกี่ยวกับครอบครัว</h2>
            <label>ชื่อจริงบิดา</label>
            <input name="name" onChange={handleFormFamily.dad} />
            <label>นามสกุล</label>
            <input name="surname" onChange={handleFormFamily.dad} />
            <label>อายุ</label>
            <input name="age" onChange={handleFormFamily.dad} />
            <label>อาชีพ</label>
            <input name="career" onChange={handleFormFamily.dad} />
            <label>สถานที่ทำงาน</label>
            <input name="workplace" onChange={handleFormFamily.dad} />
            <label>ตำแหน่ง</label>
            <input name="position" onChange={handleFormFamily.dad} />
            <label>รายได้/เดือน</label>
            <input name="income" onChange={handleFormFamily.dad} />
            <label>เบอร์โทร</label>
            <input name="tel" onChange={handleFormFamily.dad} />
            <label>ชื่อระบบเครือข่ายโทรศัพท์</label>
            <input name="network" onChange={handleFormFamily.dad} />

            <label>ชื่อจริงมารดา</label>
            <input name="name" onChange={handleFormFamily.mom} />
            <label>นามสกุล</label>
            <input name="surname" onChange={handleFormFamily.mom} />
            <label>อายุ</label>
            <input name="age" onChange={handleFormFamily.mom} />
            <label>อาชีพ</label>
            <input name="career" onChange={handleFormFamily.mom} />
            <label>สถานที่ทำงาน</label>
            <input name="workplace" onChange={handleFormFamily.mom} />
            <label>ตำแหน่ง</label>
            <input name="position" onChange={handleFormFamily.mom} />
            <label>รายได้/เดือน</label>
            <input name="income" onChange={handleFormFamily.mom} />
            <label>เบอร์โทร</label>
            <input name="tel" onChange={handleFormFamily.mom} />
            <label>ชื่อระบบเครือข่ายโทรศัพท์</label>
            <input name="network" onChange={handleFormFamily.mom} />

            <label>ติดต่อฉุกเฉิน</label>
            <label>ชื่อจริง</label>
            <input name="name" onChange={handleFormFamily.emergency} />
            <label>สกุล</label>
            <input name="surname" onChange={handleFormFamily.emergency} />
            <label>อายุ</label>
            <input name="age" onChange={handleFormFamily.emergency} />
            <label>มีความเกี่ยวข้องเป็น</label>
            <input name="concerned" onChange={handleFormFamily.emergency} />
            <label>อาชีพ</label>
            <input name="career" onChange={handleFormFamily.emergency} />
            <label>เบอร์โทร</label>
            <input name="tel" onChange={handleFormFamily.emergency} />
            <label>ระบบเครือข่ายโทรศัพท์</label>
            <input name="network" onChange={handleFormFamily.emergency} />
            <button onClick={() => {
                setSection(prev => prev - 1)
                setStep(section)
            }}>หน้าที่แล้ว</button>
            <button onClick={() => {
                setSection(prev => prev + 1)
                setStep(section)
            }}>หน้าถัดไป</button>
        </div>
    }

    const Other = () => {
        return <div>
            {Step()}
            <h2>ข้อมูลอื่น ๆ</h2>
            <label>ความสามารถพิเศษ</label>
            <input name="talent" onChange={handleFormOther} />
            <label>อุปนิสัยส่วนตัว</label>
            <input name="character" onChange={handleFormOther} />
            <label>เคยได้รับตำแหน่งใดในมหาวิทยาลัย/โรงเรียน</label>
            <input name="position" onChange={handleFormOther} />
            <button onClick={() => {
                setSection(prev => prev - 1)
                setStep(section)
            }}>หน้าที่แล้ว</button>
            <button onClick={handleSubmit}>บันทึกข้อมูลส่วนตัว</button>
        </div>
    }

    const setStep = (section) => {
        setStepBackground({ ...stepBackground, [section]: "red" })
    }

    const Step = () => {
        return (
            <div>
                <span style={{ background: stepBackground[1] }}>1</span>
                <span style={{ background: stepBackground[2] }}>2</span>
                <span style={{ background: stepBackground[3] }}>3</span>
                <span style={{ background: stepBackground[4] }}>4</span>
                <span style={{ background: stepBackground[5] }}>5</span>
                <style jsx>{`
                    div {
                        overflow-wrap: break-word;
                        text-align: center;
                        margin: 2em 0 2em 1em;
                    }

                    div > span {
                        position: relative;
                        border: 4px solid #1D3CE0;
                        border-radius: 50%;
                        margin: .8rem;
                        padding: .8em;
                        background: #1D3CE0;
                    }

                    div > span::after {
                        position: absolute;
                        content: "";
                        background: #1D3CE0;
                        width: 1.5em;
                        height: 4px;
                        top:22.5px;
                        left:39.5px;
                    }

                    div > span:last-child::after {
                        display: none;
                    }
                `}</style>
            </div>
        )
    }

    return (
        <div className="profile-container">
            {section === 1 ? <div className="profile-form"> {ProfileForm()}</div> : null}
            {section === 2 ? <div className="profile-form">{Contact()} </div> : null}
            {section === 3 ? <div className="profile-form">{Information()} </div> : null}
            {section === 4 ? <div className="profile-form">{Friend()} </div> : null}
            {section === 5 ? <div className="profile-form">{Family()} </div> : null}
            {section === 6 ? <div className="profile-form">{Other()} </div> : null}
            <style global jsx>{`
                .profile-container{
                    background-color: #69B7DB;
                }
                .profile-form {
                    min-width: 550px;
                    background: #269CD4;
                    padding: 2em 5em 2em 5em;
                    color: #FFF;
                    border-radius: 10px;
                    box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                    margin: 2em 0 2em 0;
                }
                .profile-form > div > input, button, h2 {
                    margin: 0 0 1em 0;
                    border-radius: 5px;
                }
                .profile-form > div > input {
                    height: 2em;
                }
                .profile-form > div > button {
                    height: 2em;
                    background: #D48526;
                    color: #FFF;
                    font-size: 18px;
                }
                .profile-form > div > h2 {
                    font-size: 25px;
                    text-align: center;
                }
            `}</style>
        </div>
    )
}

export default Profile
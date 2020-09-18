import React, { useContext, useState } from 'react'
import Router from 'next/router'
import { LoginState } from '../utils/context'

const verifyLogin = () => {
    const [token, setToken] = Token
    const [modal, setShowModal] = Modal
    const [menuBar, setMenuBar] = MenuBar
    const session = sessionStorage.getItem("token")
    if (!session) {
        sessionStorage.removeItem('token')
        setToken(null)
        setShowModal(false)
        setMenuBar('ลงชื่อเข้าใช้')
        Router.push('Login')
    }
}

export default verifyLogin

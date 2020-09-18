import React, { useContext, useState } from 'react'
import Router from 'next/router'
import { LoginState } from '../utils/context'

const Logout = (dummy) => {
    const [token, setToken] = Token
    const [modal, setShowModal] = Modal
    const [menuBar, setMenuBar] = MenuBar
    setToken(null)
    sessionStorage.removeItem('token')
    setShowModal(false)
    setMenuBar('ลงชื่อเข้าใช้')
    Router.push('Login')
}

export default Logout
import React from 'react'
import { useAuthentication } from '../context/AuthContext'
import { Navigate, Outlet } from 'react-router-dom'

const GuestRoute = () => {
    const {user} = useAuthentication()
    console.log(user)
  return (
    <>
      {!user.token ? <Outlet /> :<Navigate to="/" />}
    </>
  )
}

export default GuestRoute

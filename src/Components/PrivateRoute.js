import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Navigate, Route } from 'react-router-dom'

function PrivateRoute({children}) {
    const {user} = useContext(AuthContext)
  return (
      user?.uid ? children : <Navigate to="/login" />
  )
}

export default PrivateRoute

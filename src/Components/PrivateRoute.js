import React, { useContext } from 'react'
import { AuthContext } from '../Context/AuthContext'
import { Navigate, Route, Routes } from 'react-router-dom'

function PrivateRoute({component: Component, ...rest}) {
    const {user} = useContext(AuthContext)
  return (
      <Routes>
        <Route {...rest} render={props=>{
        return user?<Component {...props}/> : <Navigate to="login/" />
      }} />
      </Routes>
  )
}

export default PrivateRoute

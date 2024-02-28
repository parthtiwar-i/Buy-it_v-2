import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedAdminRoute = ({role}) => {
  return role === "admin" ? <Outlet/> : <Navigate to={"/account"} replace />
}

export default ProtectedAdminRoute
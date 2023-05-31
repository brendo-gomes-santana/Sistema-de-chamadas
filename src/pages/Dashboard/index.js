import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'
export default function Dashboard() {

  const { logout } = useContext(AuthContext)

  return (
    <>
    <button onClick={() => logout()}>Sair da conta</button>
    <div>Página de Dashboard</div>
    </>
  
  )
}

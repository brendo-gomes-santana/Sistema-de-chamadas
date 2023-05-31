import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'

import Header from '../../components/Header/Header'

export default function Dashboard() {

  const { logout } = useContext(AuthContext)

  return (
    <>
    <Header/>
    <button onClick={() => logout()}>Sair da conta</button>
    <div>Página de Dashboard</div>
    </>
  )
}

import React, { useContext } from 'react'
import { AuthContext } from '../../contexts/auth'

import { Link } from 'react-router-dom'
import './style.css'

import { FiHome, FiUser, FiSettings } from 'react-icons/fi'

export default function Header() {

  const { user } = useContext(AuthContext)
  console.log(user)
  return (
    <header className='sidebar'>
        <div>
          <img src={user.avatarUrl === null ? require('../../assets/avatar.png') : user.avatarUrl} alt='foto do usuário'/>
        </div>
        <Link to='/dashboard'>
          <FiHome color='#fff' size={24}/> Home
        </Link>
        <Link to='/customers'>
          <FiUser color='#fff' size={24}/> Cliente
        </Link>
        <Link to='/profile'>
          <FiSettings color='#fff' size={24}/> Configuração
        </Link>
    </header>
  )
}

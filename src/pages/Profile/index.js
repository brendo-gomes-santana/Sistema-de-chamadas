import React, { useContext, useState } from 'react'
import Header from '../../components/Header/Header'

import Title from '../../components/Title'
import { FiSettings, FiUpload } from 'react-icons/fi'

import { AuthContext } from '../../contexts/auth'

import './style.css'

export default function Profile() {


  const { user } = useContext(AuthContext)
  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
  return (
    <>
    <Header/>
    <div className='content'>
      <Title name='Meu perfil'>
        <FiSettings size={25}/>
      </Title>
      <div className='container'>
        <form className='form-profile'>

          <label className='label-avatar'>
            <span>
              <FiUpload color='#fff' size={25}/>
            </span>

            <input type="file" accept='image/*'/><br/>
            {avatarUrl  === null ? <img src={require('../../assets/avatar.png')} alt="foto de usuário" /> : 
            <img src={avatarUrl} alt="foto do usuário" /> }
          </label>
          
          <label>Nome: </label>
          <input type="text" placeholder='Seu nome'/>

          <label>Email: </label>
          <input type="text" disabled={true} placeholder='teste@@gmail.com'/>

          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className='container'>
        <button className='logout'>Sair</button>
      </div>
      
    </div>
    </>
  )
}

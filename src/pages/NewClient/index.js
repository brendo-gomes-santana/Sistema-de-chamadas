import React, { useState } from 'react'
import { FiUser } from 'react-icons/fi'
import Header from '../../components/Header/Header'
import Title from '../../components/Title'


import { db } from '../../services/fireabaseConnection'
import { addDoc, collection } from 'firebase/firestore'

export default function NewClient() {

  const [nome, setNome] = useState('')
  const [cnpj, setCnpj] = useState('')
  const [endereco, setEndereco] = useState('')


  async function handleRegister(e){
    e.preventDefault()

    if(!nome && !cnpj && !endereco){
      alert('preenchar os campos')
      return;
    }

    await addDoc(collection(db, 'customer'), {
      nomeFantasia: nome,
      cnpj: cnpj,
      endereco: endereco
    })
    .then(()=> {
          
    setNome('')
    setCnpj('')
    setEndereco('')
    alert('empresa cadastrada')
    
    }).catch(()=> {
      alert('algo deu errado')
    })
  }

  return (
    <>
        <Header/>
      <div className='content'> 
            <Title name='Cliente'>
                <FiUser/>
            </Title>
        <div className='container'>
          <form className='form-profile' onSubmit={handleRegister} >
              <label>Nome Fantasia</label>
              <input type="text" placeholder='Nome da empresa'
              value={nome} onChange={ v => {setNome(v.target.value)}}
              />

              <label>CNPJ</label>
              <input type="text" placeholder='Digite o CNPJ'
              value={cnpj} onChange={ v => {setCnpj(v.target.value)}}
              />

              <label>Enderenço</label>
              <input type="text" placeholder='Nome da empresa'
              value={endereco} onChange={ v => {setEndereco(v.target.value)}}
              />
              <button type='submit'>Cadastrar</button>
          </form>
        </div>
      </div>
    </>
  )
}

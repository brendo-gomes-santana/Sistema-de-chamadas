import React from 'react'
import { FiPlus, FiMessageSquare, FiSearch, FiEdit2 } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import Title from '../../components/Title'
import Header from '../../components/Header/Header'
import './style.css'

export default function Dashboard() {

  return (
    <>
    <Header/>
    <div className='content'>
      <Title name='TIckets'>
        <FiMessageSquare/>
      </Title>
      <>
      <Link to='/new' className='new'>
      <FiPlus size={25} color='#fff'/>
      Novo chamado
      </Link>
      <table>
        <thead>
          <tr>
            <th scope='col'>Cliente</th>
            <th scope='col'>Assunto</th>
            <th scope='col'>Status</th>
            <th scope='col'>Cadastrado</th>
            <th scope='col'>#</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td data-label='Cliente'>Mercado Esquina</td>
            <td data-label='Assunto'>Suporte</td>
            <td data-label='Status'>
              <span className='badge' style={{
                backgroundColor: '#999'
              }}>Em Aberto</span>
            </td>
            <td data-label='Cadastrado'>12/05/2023</td>
            <td data-label='#'>
              <button className='action' style={{
                backgroundColor: '#3583f6'
              }}><FiSearch color='#fff' size={17}/></button>
              <button className='action' style={{
                backgroundColor: '#f6a935'
              }}><FiEdit2 color='#fff' size={17}/></button>
            </td>
          </tr>
        </tbody>
      </table>
      </>
    </div>
    </>
  )
}

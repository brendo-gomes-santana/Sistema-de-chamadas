import React from 'react'
import { FiX } from 'react-icons/fi';


import './modal.css'
export default function Modal({conteudo, close}) {
  return (
    <div className='modal'>
        <div className='container'>
            <button className='close'><FiX size={25} color='#fff'
            onClick={ close }/></button>

            <main>
                <h2>Detalhes do chamado</h2>

                <div  className='row' >
                    <span>
                        Cliente: <i>{conteudo.cliente}</i>
                    </span>
                </div>
                
                <div  className='row' >
                    <span>
                        Assunto: <i>{conteudo.assunto}</i>
                    </span>
                    <span>
                        Cadastrado em: <i>{conteudo.createdFormat}</i>
                    </span>
                </div>

                <div  className='row' >
                    <span>
                        Status: <i>{conteudo.status}</i>
                    </span>
                </div>
                <>
                <h3>Complemento</h3>
                <p>{conteudo.complemento === '' ? 'Não possui complemento' : conteudo.complemento}</p>
                </>
            </main>
        </div>
    </div>
  )
}

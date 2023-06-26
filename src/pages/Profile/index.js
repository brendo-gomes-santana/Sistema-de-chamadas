import React, { useContext, useState } from 'react'
import Header from '../../components/Header/Header'

import Title from '../../components/Title'
import { FiSettings, FiUpload } from 'react-icons/fi'

import { AuthContext } from '../../contexts/auth'

import { db, storage } from '../../services/fireabaseConnection'
import { doc, updateDoc } from 'firebase/firestore'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'

import './style.css'

export default function Profile() {


  const { user, storageUser, setUser, logout } = useContext(AuthContext)

  const [avatarUrl, setAvatarUrl] = useState(user && user.avatarUrl)
  const [nome, setNome] = useState(user && user.nome)
  const [email] = useState(user && user.email)

  const [imageAvatar, setImagemAvatar] = useState(null)

  function handleFile(v){
    if(v.target.files[0]){
      const image = v.target.files[0]

      if(image.type === 'image/jpeg' || image.type === 'image/png'){
        setImagemAvatar(image)
        setAvatarUrl(URL.createObjectURL(image))
      }else{
        alert('Envie uma imagem do tipo PNG ou JPEG')
        setImagemAvatar(null)
        return
      }
    }
  }

  async function handleSubmit(e){
    e.preventDefault()
    if(imageAvatar === null && nome !== ''){

      //atualizar apenas o nome do user
      const docRef = doc(db, "user", user.id)
      await updateDoc(docRef, {
        nome: nome
      })
      .then(()=> {
        let data = {
          ...user,
          nome: nome
        }
        setUser(data)
        storageUser(data)
      })
    }else if(nome !== '' && imageAvatar !== null){
      //atualizar a foto
      hadleUpload()
    }

  }

  async function hadleUpload(){
    const currentId = user.id;
    const uploadRef = ref(storage, `image/${currentId}/${user.nome}`)
    uploadBytes(uploadRef, imageAvatar)
    .then((snapshot)=> {
      alert('Enviando com sucesso')

      getDownloadURL(snapshot.ref).then( async (downloadURL) => {
        let urlFotos = downloadURL;

        const docRef = doc(db, 'user', user.id)

        await updateDoc(docRef, {
          avatarUrl: urlFotos,
          nome: nome,
        })
        .then( () => {
          let data = {
            ...user,
            nome: nome,
            avatarUrl: urlFotos
          };
          setUser(data);
          storageUser(data);
        })
      })
    })
  }
  return (
    <>
    <Header/>
    <div className='content'>
      <Title name='Meu perfil'>
        <FiSettings size={25}/>
      </Title>
      <div className='container'>
        <form className='form-profile' onSubmit={handleSubmit}>

          <label className='label-avatar'>
            <span>
              <FiUpload color='#fff' size={25}/>
            </span>

            <input type="file" accept='image/*' onChange={handleFile} /><br/>
            {avatarUrl  === null ? <img src={require('../../assets/avatar.png')} alt="foto de usuário" /> : 
            <img src={avatarUrl} alt="foto do usuário" /> }
          </label>
          
          <label>Nome: </label>
          <input type="text" placeholder={nome} value={nome} onChange={v => setNome(v.target.value)}/>

          <label>Email: </label>
          <input type="text" disabled={true} placeholder={email}/>

          <button type="submit">Salvar</button>
        </form>
      </div>

      <div className='container'>
        <button className='logout' onClick={ () => logout()}>Sair</button>
      </div>
    </div>
    </>
  )
}

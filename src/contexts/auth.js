import { createContext, useState } from "react";

import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { auth, db } from '../services/fireabaseConnection'

export const AuthContext = createContext({})

export default function AuthProvider({children}){

    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)

    async function login(email, password){
        alert(email)
        alert(password)
    }

    async function cadastrar(nome, email, password){
        setLoadingAuth(true)

        await createUserWithEmailAndPassword(auth, email, password)
        .then(async (value)=> {
            let id = value.user.uid

            await setDoc(doc(db, 'user', id), {
                nome: nome,
                avatarUrl: null,

            }).then(()=> {
                let data = {
                    id: id,
                    nome: nome,
                    email: value.user.email,
                    avatarUrl: null
                }
                setUser(data)
                setLoadingAuth(false)
                storageUser(data)
                toast.success('Seja bem-vindo ao sistema!')
                navigate('/dashboard')

            }).catch((err)=> {
                console.log(err)
                setLoadingAuth(false)
            })

        })
        .catch((err)=> {
            console.log(err)
            setLoadingAuth(false)
        })

    }

    function storageUser(data){
        localStorage.setItem('@user', JSON.stringify(data))
    }

    return(
        <AuthContext.Provider 
        value={{
            signed: !!user, //quando colocar dois !! ele transformar a informação para booleando, no caso
            user,           // quando não tem informação dentro do user ele fica como false e se tem true.
            login,
            cadastrar, 
            loadingAuth           
        }}>
            {children}
        </AuthContext.Provider>
    )
}
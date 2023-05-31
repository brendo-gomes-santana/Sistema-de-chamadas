import { createContext, useState, useEffect } from "react";

import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

import { auth, db } from '../services/fireabaseConnection'

export const AuthContext = createContext({})

export default function AuthProvider({children}){

    const navigate = useNavigate()

    const [user, setUser] = useState(null)
    const [loadingAuth, setLoadingAuth] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(()=> {
        (async()=> {
            const storageUser = JSON.parse(localStorage.getItem('@user'))

            if(storageUser){
                setUser(storageUser)
                setLoading(false)
            }
            setLoading(false)
        })()
    },[])

    async function login(email, password){

        setLoadingAuth(true)
        
        await signInWithEmailAndPassword(auth, email, password)
        .then(async (value)=> {

            const docRef = doc(db, 'user', value.user.uid)
            const docSnap = await getDoc(docRef)
            let data = {
                id: value.user.id,
                nome: docSnap.data().nome,
                email: value.user.email,
                avatarUrl: docSnap.data().avatarUrl
            }

            setUser(data)
            storageUser(data)
            setLoadingAuth(false)
            toast.success('Bem vindo de volta!')
            navigate('/dashboard')
        })
        .catch((erro)=> {
            console.log(erro)
            setLoadingAuth(false)
            toast.error('Ocorreu algo errado')
        })
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

    async function logout(){
        await signOut(auth)
        localStorage.removeItem('@user')
        setUser(null)
    }

    return(
        <AuthContext.Provider 
        value={{
            signed: !!user, //quando colocar dois !! ele transformar a informação para booleando, no caso
            user,           // quando não tem informação dentro do user ele fica como false e se tem true.
            login,
            cadastrar, 
            loadingAuth ,
            loading,
            logout          
        }}>
            {children}
        </AuthContext.Provider>
    )
}
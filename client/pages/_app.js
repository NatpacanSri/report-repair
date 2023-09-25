import '@/styles/globals.css'
import Nav from './components/nav'
import { useState,useEffect } from 'react';


export default function App({ Component, pageProps }) {

  const [message, setMessage] = useState('')
  const [auth,setAuth] = useState(false)
  const [user,setUser] = useState()

  useEffect(() => {
    (
      async () => {
        try {
          const response = await fetch('http://localhost:8080/user/userExist', {
            credentials: "include"
          })
          const userExist = await response.json()
          
          // console.log(userExist)
          if(userExist.auth === false){
            // console.log(userExist)
            setAuth(false)
          }else{
            // console.log(userExist)
            setMessage(`Hi ${userExist.fullname}`)
            setAuth(true)
            setUser(userExist)
          }
        } catch (error) {
          console.log(error)
          setMessage(`Error: ${error}`)
          // setAuth(false)
        }

      }
    )()
  })

  return (
    <main className=''>
      <Nav auth={auth}/>
      <Component {...pageProps} />
    </main>
  )
}

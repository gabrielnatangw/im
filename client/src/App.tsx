import axios from "axios"
import { useEffect, useState } from "react"

function App() {
  const [env,setEnv] = useState('')

  useEffect(()=>{
    axios.get('http://localhost:3000/env')
    .then(el=>{
      setEnv(el.data.env)
    })
  },[])

  return (
    <main 
      style={{
        width:'100vw',
        height:'100vh',
        display:"flex",
        alignItems:"center",
        justifyContent:"center"
      }}
    >
      INSTANCE: {env}
    </main>
  )
}

export default App

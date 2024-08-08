import express from "express"
import cors from "cors"

const app = express()
const port = 3000


app.use(cors())
app.use(express.json())

app.get('/env',(req, res)=>{
    const envSend = process.env.ENV_MY || 'not found'
    return res.json({env: envSend})
})

app.listen(port,()=>{
    console.log("API RUUNER PORT: ",port)
})
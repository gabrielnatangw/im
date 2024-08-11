import express from "express"
import cors from "cors"
import fs from "fs"
import os from "os"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())



function getExternalIPv4() {
    const interfaces = os.networkInterfaces();
    for (let iface in interfaces) {
        for (let details of interfaces[iface]) {
            if (details.family === 'IPv4' && !details.internal) {
                return details.address;
            }
        }
    }
    return 'IP não encontrado';
}

app.get('/env',(req, res)=>{
    const ip = getExternalIPv4();
    return res.json({env: JSON.stringify(ip, null, 2)})
})

app.listen(port,()=>{
    console.log("API RUUNER PORT: ",port)
})
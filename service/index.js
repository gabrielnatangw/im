import express from "express"
import cors from "cors"
import fs from "fs"

const app = express()
const port = 3000

app.use(cors())
app.use(express.json())

app.get('/env',(req, res)=>{
    const dockerIdFile = '/proc/self/cgroup';

    fs.readFile(dockerIdFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Erro ao ler o ID do container Docker:', err);
            return;
        }

        // O ID do container é a última parte do caminho no cgroup
        const containerId = data.split('\n')[0].split('/').pop();
        console.log('ID do container Docker:', containerId);
    });

    const envSend = process.env.ENV_MY || 'not found'
    return res.json({env: envSend})
})

app.listen(port,()=>{
    console.log("API RUUNER PORT: ",port)
})
import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import cors from 'cors'
import 'dotenv/config'
import customItemsRouter from './routes/customItems.js'



const app = express()

app.use(cors())
app.use(express.json())

app.get('/api/health', (_, res) => {
    res.status(200).json({ status: 'ok' })
})

app.use('/api/custom-items', customItemsRouter)
const PORT = process.env.PORT || 3000

if (process.env.NODE_ENV === 'development') {
    app.use(favicon(path.resolve('../', 'client', 'public', 'lightning.png')))
}
else if (process.env.NODE_ENV === 'production') {
    app.use(favicon(path.resolve('public', 'lightning.png')))
    app.use(express.static('public'))
}

 


if (process.env.NODE_ENV === 'production') {
    app.get('/*', (_, res) =>
        res.sendFile(path.resolve('public', 'index.html'))
    )
}

app.listen(PORT, () => {
    console.log(`server listening on http://localhost:${PORT}`)
})
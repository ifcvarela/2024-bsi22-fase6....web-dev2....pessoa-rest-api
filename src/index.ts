import express from 'express'
import router from './routes'
const port = 3000
const app = express()
app.use(router)
app.listen(port, () => console.log(`⚡ Server running on port ${port}`))
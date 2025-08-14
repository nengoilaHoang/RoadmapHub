import express from 'express'
// import auRoutes from './routes/auth.route.js'
import cors from 'cors'
const app = express()

app.get('/', (req, res) => {
  res.send('Hello World')
})
app.use(cors());
app.use(express.json())
// app.use('/api/accounts', auRoutes)
app.listen(5000,()=>{
    console.log('Server is running at http://localhost:5000')
})

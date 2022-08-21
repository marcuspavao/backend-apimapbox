import {routes} from './routes'
const express = require ('express')
const app = express()

app.use(express.json())
app.use(express.urlencoded())
app.use(routes)

app.listen(3000, ()=> {console.log("Server is runing on port 3000")})



import express from 'express'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import ejs from 'ejs'
import cookieParser from 'cookie-parser'
import {verifyToken} from './middleware/verifyToken.js'
import userRoutes from './routes/userRoutes.js'
import linkRoutes from './routes/linkRoutes.js'
import path from 'path'
dotenv.config()

const app = express()

app.use(cookieParser())
app.use(express.static('./public'))
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.set('views', 'views')
app.set('view engine', 'ejs')

app.use(userRoutes)
app.use(linkRoutes)

const PORT = process.env.PORT || 3000
app.listen(PORT)
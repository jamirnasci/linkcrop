import mysql2 from 'mysql2/promise'
import dotenv from 'dotenv'
dotenv.config()

const pool = mysql2.createPool({
    user: process.env.USER_DB,
    password: process.env.PASSWORD_DB,
    database: process.env.DATABASE_DB,
    host: process.env.HOST_DB
})

export default pool


import pool from "../db/db.js"
import bcrypt from 'bcrypt'

export async function findOne(email) {
    const sql = 'SELECT * FROM user WHERE email = ?'
    try {
        const conn = await pool.getConnection()
        const [result] = await conn.execute(sql, [email])
        return result[0]
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function createUser(username, email, password){
    const sql = 'INSERT INTO user(username, email, password, createdAt) VALUES(?,?,?,?)'
    try {
        const conn = await pool.getConnection()
        const hashedPass = await bcrypt.hash(password, 10)
        const [result] = await conn.execute(sql, [username, email, hashedPass, new Date()])
        return {
            success: result.affectedRows === 1,
            userId: result.insertId
        }
    } catch (error) {
        console.log(error)
        return {
            success: false,
            error: error.message
        }
    }
}
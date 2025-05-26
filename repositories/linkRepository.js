import pool from "../db/db.js";

export async function getLinks(id){
    const sql = 'SELECT * FROM link WHERE user_iduser = ?'
    try { 
        const conn = await pool.getConnection()
        const [result] = await conn.execute(sql, [id])   
        return result
    } catch (error) {
        console.log(error)
        return null
    }
}

export async function createLink(title, original_link, label, iduser){
    const sql = 'INSERT INTO link(title, original_link, label, clicks, createdAt, user_iduser) VALUES(?,?,?,?,?,?)'
    try {
        const conn = await pool.getConnection()
        const [result] = await conn.execute(sql, [title, original_link, label, 0, new Date(), iduser])

        return {
            success: result.affectedRows === 1,
            linkId: result.insertId
        }
    } catch (error) {
        console.log(error)
        return{
            success: false,
            error: error.message
        }
    }
}

export async function deleteLink(iduser, idlink){
    const sql = 'DELETE FROM link WHERE user_iduser = ? AND idlink = ?'
    try {
        const conn = await pool.getConnection()
        const [result] = await conn.execute(sql, [iduser, idlink])

        return {
            success: result.affectedRows === 1,
        }
    } catch (error) {
        return{
            success: false,
            error: error.message
        }
    }
}

export async function findByLabel(label){
    const sql = 'SELECT original_link FROM link WHERE label = ?'
    try { 
        const conn = await pool.getConnection()
        const [result] = await conn.execute(sql, [label])   
        return result[0]
    } catch (error) {
        console.log(error)
        return null
    }
}
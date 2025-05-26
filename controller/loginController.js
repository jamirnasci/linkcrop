import jwt from 'jsonwebtoken'
import { createUser, findOne } from '../repositories/userRepository.js'
import bcrypt from 'bcrypt'

export const loginGet = (req, res)=>{
    res.render('index')
}

export const loginPost = async (req, res)=>{
    const {email, password} = req.body
    const user = await findOne(email)
    console.log(user)
    if(!user){
        return res.status(401).json({msg: 'Usuário não encontrado'})
    }
    console.log('Senha enviada:', password)
    console.log('Hash armazenado:', user.password)
    
    const passComp = await bcrypt.compare(password, user.password)
    console.log('Comparação:', passComp)
    if(passComp){
        const payload = {id: user.iduser}
        const token = jwt.sign(payload, process.env.SECRET_KEY, {expiresIn: '1d'})
        res.cookie('token', token)
       return res.status(200).json({msg: 'Login realizado'}) 
    }
    return res.status(400).json({msg: 'Senha incorreta'})
}

export const logout = (req, res)=>{
    res.clearCookie('token')
    res.redirect('/')
}

export const signup = async (req, res)=>{
    const {username, email, password} = req.body
    const result = await createUser(username, email, password)
    if(result.success){
        res.status(200).json({msg: 'Usuário criado com sucesso'})
    }else{
        res.status(400).json({msg: 'Falha ao criar usuário'})
    }
}

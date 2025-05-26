import jwt from 'jsonwebtoken'

export function verifyToken(req, res, next){
    const token = req.cookies['token']

    if(!token){
        return res.redirect('/')
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY)
        req.userId = decoded.id
        next()
    } catch (error) {
        console.log(error)
        return res.redirect('/')
    }
}
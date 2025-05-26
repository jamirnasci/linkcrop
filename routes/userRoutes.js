import express from 'express'
import { loginGet, loginPost, logout, signup } from '../controller/loginController.js'

const router = express.Router()

router.get('/', loginGet)
router.post('/login', loginPost)
router.get('/logout', logout)
router.post('/signup', signup)

export default router
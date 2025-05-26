import { linkDelete, linkGet, newLink, newLinkPost } from '../controller/linkController.js'
import { verifyToken } from '../middleware/verifyToken.js'
import express from 'express'

const router = express.Router()

router.get('/links', verifyToken, linkGet)
router.get('/newLink', verifyToken, newLink)
router.post('/newLink', verifyToken, newLinkPost)
router.delete('/delete/:id', verifyToken, linkDelete)
export default router
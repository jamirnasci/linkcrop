import express from 'express'
import {findByLabel} from './repositories/linkRepository.js'
const app = express()

app.get('/:label', async (req, res)=>{
    const link = await findByLabel(req.params.label)
    if(link){
        res.redirect(link.original_link)
    }else{
        res.redirect('http://localhost:3000/')
    }
})

app.listen(3001)
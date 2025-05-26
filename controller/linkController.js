import { createLink, getLinks, deleteLink } from "../repositories/linkRepository.js"

export const linkGet =  async (req, res)=>{
    const links = await getLinks(req.userId)
    console.log(links)
    res.render('links', {links: links})
}

export const newLink = (req, res)=>{
    res.render('newLink')
}

export const newLinkPost = async (req, res)=>{
    const {title, original_link, label} = req.body
    const result = await createLink(title, original_link, label, req.userId)
    if(result.success){
        res.status(200).json({msg: 'Link criado com sucesso'})
    }else{
        res.status(400).json({msg: 'Falha ao encurtar link'})
    }
}

export const linkDelete = async (req, res)=>{
    const idlink = req.params.id
    const result = await deleteLink(req.userId, idlink)

    if(result.success){
        return res.status(200).json({msg: 'Link removido'})
    }
    return res.status(400).json({msg: 'Falha ao apagar link'})
}
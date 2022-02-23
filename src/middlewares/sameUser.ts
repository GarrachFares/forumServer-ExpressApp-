import * as postService from '../services/posts.service'
//does not work
export const sameUser = () => async(req : any ,res: any ,next:any ) =>{
    const postToDelete = await postService.getById(req.params.id)
    if ((postToDelete) &&( req.user._id == postToDelete.user)){
        next()
    }else{
        res.sendStatus(401)
    }
}
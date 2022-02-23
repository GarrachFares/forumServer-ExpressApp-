import * as groupService from '../services/groups.service'
export const userIsAdmin = () => async(req : any ,res: any ,next:any ) =>{
    const group = await groupService.getById(req.params.id)
    if (group.admins.includes(req.user._id)){
        next()
    }else{
        res.status(401).send('you must be an admin')
    }
}
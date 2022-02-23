import type { Controller } from '../@types'
import * as service from '../services/posts.service'
import  * as userService from '../services/users.service'
import  * as groupService from '../services/groups.service'
export const getAll: Controller = async (req, res) => {
  try {
    const data = await service.getAll()
    res.json(data)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const getById: Controller = async (req, res) => {
  try {
    const id = req.params.id
    const data = await service.getById(id)
    
    res.json(data)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const create: Controller = async (req, res) => {
    try {
      const {content,group,user} = req.body
      const body = {content,group,user}
      // if the post is in a group
      if(body.group){
        //if user is not a member of the group
        var _group = await groupService.getById(body.group)
        if(! _group.members.includes(req.user._id)){
          res.status(400).send('the user is not a member of the group')
          return 
        }
      }
      body.user = req.user._id 

      const data = await service.create(body)
      var d =data.toObject()
      d.user = {
        _id:req.user._id ,
        name:req.user.name ,
        imgUrl:req.user.imgUrl
      }
      await userService.addPost(data.user ,data._id)
      if(body.group) await groupService.addPost(_group._id,data._id)
      res.json(d)
    } catch (e: any) {
      res.status(400).send(e.message)
    }
}

export const update: Controller = async (req, res) => {
  try {
    const id = req.params.id  
    const body = req.body
    const data = await service.update(id,body)
    res.json(data)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const kill: Controller = async (req, res) => {
  try {
    const id = req.params.id
    const data = await service.kill(id)
    res.json(data)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}
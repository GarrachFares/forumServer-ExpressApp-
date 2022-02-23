import type { Controller } from '../@types'
import * as service from '../services/groups.service'
import * as userService from '../services/users.service'

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
      var data= await service.getById(id) // data's type is Document and its imutable i think :p 
      //we can cast to object or use lean is quary
      var d = data.toObject()
      //data.isAdmin = data.admins.includes(req.user._id)
      d.isAdmin = data.admins.includes(req.user._id)
      d.isMember = data.members.includes(req.user._id)
      //console.log(req.user._id,data.admins)
      res.json(d)
    } catch (e: any) {
      res.status(400).send(e.message)
    }
  }
  

export const join: Controller = async (req, res) => {
    try {
      const id = req.params.id
      const data = await service.getById(id)
      //if already a member
      if(data.members.includes(req.user._id)){
        res.status(400).send("already a member")
        return 
      }
      //else join
      const addedMember = await service.addMember(data._id,req.user._id)
      await userService.joinGroup(req.user._id,data._id)
      res.json(addedMember)
    } catch (e: any) {
      res.status(400).send(e.message)
    }
}

export const leave: Controller = async (req, res) => {
    try {
      const id = req.params.id
      const data = await service.getById(id)
      //if not already a member
      if(!data.members.includes(req.user._id)){
        res.status(400).send("not a member")
        return 
      }
      //if the last admin
      if(data.admins.includes(req.user._id) && data.admins.length == 1){
        res.status(400).send("you need to leave an admin")
        return 
      }
      //else leave
      const removedMember = await service.removeMember(data._id,req.user._id)
      await userService.leaveGroup(req.user._id,data._id)
     
      res.json(removedMember)
    } catch (e: any) {
      res.status(400).send(e.message)
    }
}

export const getAdmins: Controller = async (req, res) => {
    try {
      const id = req.params.id
      const data = await service.getById(id)
      res.json(data.admins)
    } catch (e: any) {
      res.status(400).send(e.message)
    }
}

export const addAdmin: Controller = async (req, res) => {
    try {
      const id = req.params.id
      const userId = req.params.userid
      const group = await service.getById(id)
      if(!group.members.includes(userId)){
        res.status(400).send("not a member")
        return
      }
      if(group.admins.includes(userId)){
        res.status(400).send("already an admin")
        return
      }
      const data = await service.addAdmin(id,userId)
      res.json(data)
    } catch (e: any) {
      res.status(400).send(e.message)
    }
}



export const create: Controller = async (req, res) => {
    try {
      const body = req.body
      body.members = [req.user._id]
      body.admins = [req.user._id]
      const data = await service.create(body)
      const modifiedUser = await userService.joinGroup(req.user._id,data._id)
      res.json(data)
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
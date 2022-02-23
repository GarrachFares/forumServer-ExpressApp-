import Group from '../models/group.model'
import type { ObjectId } from 'mongoose'

export const getAll = async () => {
  return Group.find()
}

export const getById = async (id: ObjectId) => {
  return Group.findById(id).populate({path :'posts',
  populate :{path: 'user', select:'_id name imgUrl'}

  })
}

export const create = async (post: any) => {
  return Group.create(post)
}

export const update = async (id: ObjectId, group:any) => {
  return Group.findByIdAndUpdate(id,group,{new : true}) // new returns the user after the update
}

export const addAdmin= async (groupId: ObjectId, user:any) => {
    return Group.updateOne({ _id: groupId }, 
        { $push: { admins: user } })
}

export const addMember = async (groupId: ObjectId, user:any) => {
    return Group.updateOne({ _id: groupId }, 
        { $push: { members: user } })
}

export const addPost = async (groupId: ObjectId, post:any) => {
    return Group.updateOne({ _id: groupId }, 
      { $push: { posts: post } })
  }

export const removeMember = async (groupId: ObjectId, user:any) => {
    return Group.updateOne({ _id: groupId }, 
        { $pull: { members: user , admins:user} })

}

export const kill = async (id: ObjectId) => {
  return Group.findByIdAndDelete(id)
}
import User from '../models/user.model'
import type { ObjectId } from 'mongoose'

export const getAll = async () => {
  return User.find()
}

export const getById = async (id: ObjectId) => {
  return User.findById(id)
}

export const getPopulatedById = async (id: ObjectId) => {
  return User.findById(id).populate('posts')
}

export const create = async (user: any) => {
  return User.create(user)
}

export const update = async (id: ObjectId, user:any) => {
  return User.findByIdAndUpdate(id,user,{new : true}) // new returns the user after the update
}

export const addPost = async (userId: ObjectId, post:any) => {
  return User.updateOne({ _id: userId }, 
    { $push: { posts: post } })
}

export const joinGroup = async (userId: ObjectId, group:any) => {
  return User.updateOne({ _id: userId }, 
    { $push: { groups: group } })
}

export const leaveGroup = async (userId: ObjectId, group:any) => {
  return User.updateOne({ _id: userId }, 
    { $pull: { groups: group } })
}

export const kill = async (id: ObjectId) => {
  return User.findByIdAndDelete(id)
}
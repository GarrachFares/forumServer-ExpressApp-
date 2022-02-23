import Tweet from '../models/post.model'
import type { ObjectId } from 'mongoose'

export const getAll = async () => {
  return Tweet.find()
}

export const getById = async (id: ObjectId) => {
  return Tweet.findById(id)
}

export const create = async (post: any) => {
  return Tweet.create(post)
}

export const update = async (id: ObjectId, post:any) => {
  return Tweet.findByIdAndUpdate(id,post,{new : true}) // new returns the user after the update
}

export const kill = async (id: ObjectId) => {
  return Tweet.findByIdAndDelete(id)
}
import type { Controller } from '../@types'
import * as service from '../services/users.service'

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
    const id = req.user._id
    const data = await service.getById(id)
    res.json(data)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const getByToken: Controller = async (req, res) => {
  try {
    const id = req.user._id
    let data = await service.getPopulatedById(id)
    const dt = data.toJSON()
    delete dt.password
    res.json(dt)
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const getGeneralById: Controller = async (req, res) => {
  try {
    const id = req.params.id
    const data = await service.getPopulatedById(id)
    const {name,imgUrl,posts} = data
    res.json({name,imgUrl,posts})
  } catch (e: any) {
    res.status(400).send(e.message)
  }
}

export const create: Controller = async (req, res) => {
    try {
      const body = req.body
      const data = await service.create(body)
      res.json(data)
    } catch (e: any) {
      res.status(400).send(e.message)
    }
}

export const update: Controller = async (req, res) => {
  try {
    const id = req.user._id  
    const body = req.body
    if(!(body.password && body.password!= '')) delete body.password
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
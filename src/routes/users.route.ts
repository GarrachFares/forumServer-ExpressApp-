import { Router } from "express";
import * as users from '../controllers/users.controller'
import { authentify } from "../middlewares/authentify";
import { sameUser } from "../middlewares/sameUser";

const router = Router()

router.get('/all' ,users.getAll) //only app admin
router.get('/' ,authentify(),users.getByToken) //gets the profile of the logged user
router.get('/:id',authentify(), users.getGeneralById) // only auth
router.get('/edit',authentify(),sameUser(), users.getById)
//router.post('/',users.create)// only by register
router.put('/edit',authentify(), users.update) // only the same id
router.delete('/:id' ,users.kill)
export default router
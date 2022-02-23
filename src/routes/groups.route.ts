import { Router } from "express";
import * as groups from '../controllers/groups.controller'
import { authentify } from "../middlewares/authentify";
import { userIsAdmin } from "../middlewares/userIsAdmin";


const router = Router()

router.get('/' ,groups.getAll) //get all users groups
router.get('/:id',authentify(), groups.getById) // only auth
router.post('/',authentify(),groups.create)// only by register
router.post('/:id/join',authentify(),groups.join)
router.post('/:id/leave',authentify(),groups.leave)
router.get('/:id/admins',authentify(),groups.getAdmins)
router.post('/:id/admins/add/:userid',authentify(),userIsAdmin(),groups.addAdmin)
router.put('/:id',authentify(),userIsAdmin(), groups.update) // edit
router.delete('/:id' ,authentify(),userIsAdmin(),groups.kill)
export default router
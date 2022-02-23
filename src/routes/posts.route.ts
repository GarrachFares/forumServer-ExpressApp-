import { Router } from "express";
import * as posts from '../controllers/posts.controller'
import { authentify } from "../middlewares/authentify";
import { sameUser } from "../middlewares/sameUser";
const router = Router()

router.get('/',posts.getAll) // app admin only
router.get('/:id',authentify(),posts.getById)
router.post('/',authentify(),posts.create)
router.put('/:id',authentify(),sameUser(),posts.update)

//router.post('/:groupid',authentify(),posts.create)



router.delete('/:id',authentify(),sameUser(),posts.kill)

export default router
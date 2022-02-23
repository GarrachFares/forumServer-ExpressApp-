import { Router } from "express"
import posts from './posts.route'
import users from './users.route'
import groups from './groups.route'
import login from './login.route'
import register from './register.route'

const router = Router()
router.use('/posts' ,posts)
router.use('/users' , users)
router.use('/groups',groups)
router.use('/',login)
router.use('/',register)


export default router

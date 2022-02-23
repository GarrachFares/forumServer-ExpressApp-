import { Router } from "express";
import User from "../models/user.model";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
const router = Router()

router.post('/login',async (req,res) => {
    const body = req.body 
    try{
        const user = await User.findOne({ email: body.email }).lean()
        if (!user) {
            return res.status(400).send('User not found')
        }
        const doesPasswordMatch = await bcrypt.compare(body.password, user.password)
        if (!doesPasswordMatch) {
            return res.status(400).send('Password does not match')
        }
        delete user.password 
        const  token = jwt.sign(
            user,
            process.env.SECRET || 'SECRET',
            {expiresIn: '10h'}
        )
        res.json({"token" :token})
    }catch(e){
        console.log(e)
        return res.status(400).send("smthing went wrong")
    }
    

})

export default router
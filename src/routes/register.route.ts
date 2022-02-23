import { Router } from "express";
import User from "../models/user.model";
import jwt from 'jsonwebtoken'
const router = Router()

router.post('/register',async (req,res) => {
    const body = req.body 
    
    
    try{
        const existingUser = await User.findOne({ email: body.email }).lean()

        if (existingUser) {
            return res.status(400).send('User exists')
        }
        const newUser = await User.create(body)
        const jsonNewUser = newUser.toJSON()
        delete jsonNewUser.password 
        const  token = jwt.sign(
         jsonNewUser,
        process.env.SECRET || 'SECRET',
         {expiresIn: '10h'}
         )
         res.json({"token":token})
    }catch(e){
        console.log(e)
        return res.status(400).send("smthing went wrong")
    }

    

    



    

})

export default router
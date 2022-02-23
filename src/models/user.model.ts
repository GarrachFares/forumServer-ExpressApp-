import Mongoose from 'mongoose'
import bcrypt from 'bcrypt' 
const userSchema = new Mongoose.Schema(
    {
        name: {
          type: String,
          required: true,
        },
        email: {
          type: String,
          required: true,
        },
        password: {
          type: String,
          required: true,
        },
        imgUrl: {
          type: String,
          required: false,
        },
        backgroundImgUrl :{
          type: String,
          required: false,
        },
        posts: [
          {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'post',
          },
        ],
        groups: [
          {
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'group',
          },
        ],
    },
    {
        timestamps: true,
    }
)

userSchema.pre('findOneAndUpdate',async function (next) {
  let data: any = this.getUpdate();
  if( data.password) data.password = await bcrypt.hash(data.password,10)
  next()
  
})
userSchema.pre('save',async function (next) {
  this.password = await bcrypt.hash(this.password,10)
  next()
})

const UserModel =Mongoose.models.UserModel || Mongoose.model('user',userSchema)
export default UserModel 
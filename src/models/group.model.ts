import Mongoose from 'mongoose'
const groupSchema = new Mongoose.Schema(
    {
        members: [{
          type: Mongoose.Schema.Types.ObjectId,
          ref: 'user',
          required: true,
        }],
        admins: [{
            type: Mongoose.Schema.Types.ObjectId,
            ref: 'user',
            required: true,
        }],
        name: {
            type: String,
            required: true,
            maxlength: 140 ,
        } ,
        description: {
          type: String,
          required: true,
          maxlength: 140 ,
        },
        posts: [
            {
              type: Mongoose.Schema.Types.ObjectId,
              ref: 'post',
            },
        ],
        imgUrl :{
          type: String,
          required: false,
        } ,
        backgroundImgUrl :{
          type: String,
          required: false,
        },      
        
    },
    {
        timestamps: true,
    }
)

const GroupModel = Mongoose.model('group',groupSchema)
export default GroupModel 
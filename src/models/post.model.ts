import Mongoose from 'mongoose'
const postSchema = new Mongoose.Schema(
    {
        user: {
          type: Mongoose.Schema.Types.ObjectId,
          ref: 'user',
          required: true,
        },
        content: {
          type: String,
          required: true,
          maxlength: 140 ,
        },
        group: {
          type: Mongoose.Schema.Types.ObjectId,
          ref: 'group',
          required: false,
        },
    },
    {
        timestamps: true,
    }
)

const PostModel = Mongoose.model('post',postSchema)
export default PostModel 
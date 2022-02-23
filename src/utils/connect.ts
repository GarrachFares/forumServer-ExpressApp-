import Mongoose from 'mongoose' 


export const connect = async()=> {
    const dbUri = 'mongodb+srv://dbuser:dbuser@cluster0.dge37.mongodb.net/fbCloneB?retryWrites=true&w=majority'
    await Mongoose.connect(dbUri || '')
    console.log('connected to mongoDB')
}



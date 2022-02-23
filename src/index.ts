import express, { type Request, Response } from 'express'
import morgan from 'morgan'
import cors from 'cors'
import parser from 'body-parser'
import routes from './routes'
import {connect} from './utils/connect'
const app = express()


app.use(morgan('tiny'))
app.use(cors()) 
app.use(parser.json())

app.use(routes)

connect()
  .then( ()=> { app.listen(4000, () => {
    console.log('Server is running on port 4000')
    })
  })
  .catch(console.error)

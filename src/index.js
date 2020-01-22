import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'
import morgan from 'morgan'

import routes from './routes'

const app = express();

//mongodb connection
mongoose.connect("mongodb+srv://week6:week6@cluster0-pvlax.mongodb.net/week10?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true
})

app.use(cors())
app.use(express.json())
app.use(morgan('dev'))
app.use(routes)

app.listen(3334)
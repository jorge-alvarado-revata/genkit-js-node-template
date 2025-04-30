'use strict'

import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import bodyParser from 'body-parser'



const app = express()
app.use(express.json())
app.use(morgan("dev")) //logs
app.use(helmet()) // seguridad de encabezados

var allowlist = ['http://localhost:4200', 'http://127.0.0.1:4200', 'http://0.0.0.0:4200']
var corsOptions = {
  origin: allowlist,
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions))
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())


import api from "./api/index.js"


app.use("/api/v1", api)


export default app

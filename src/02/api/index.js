'use strict'

import express from 'express'
import chatbot from "./chatbot.js"
import helloworld from "./helloworld.js"



const router = express.Router()

router.get('/', function(req, res){
    res.json({
        message: "API V1 Para usar genAI con Firebase Genkit 1.x.",
      })
})

router.use('/helloworld/', helloworld)
router.use('/chatbot/', chatbot)


export default router
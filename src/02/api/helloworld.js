'use strict'

// Importar genkit y googleAI plugin library

import { gemini20Flash, googleAI } from '@genkit-ai/googleai'
import { genkit } from 'genkit'
import express from 'express'

const router = express.Router()

// configura la instancia de genkit
const ai = genkit({
  plugins: [googleAI()],
  model: gemini20Flash, // set default model
});

async function helloworld() {
  // haz una consulta al modelo
  const { text } = await ai.generate({
    prompt: 'Hello, Gemini, como te sientes!',
    output:{ 
        format: 'text'
    }
});
  return text
}

router.get('/', async (req, res)=>{

    try{

        const respuesta  = await helloworld()

        res.send({
            respuesta: respuesta.replace(/(\r\n|\n|\r)/g, "")
        })

    }
    catch(err){

        res.send(
            {
                error: 500,
                mensaje: err
            }
        )

    }
})

export default router
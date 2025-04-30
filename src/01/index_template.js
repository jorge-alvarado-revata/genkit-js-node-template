'use strict'

// Importar genkit y googleAI plugin library

import { gemini20Flash, googleAI } from '@genkit-ai/googleai'
import { genkit } from 'genkit'
import { startFlowServer } from '@genkit-ai/express'
import dotenv from 'dotenv'
dotenv.config()


const PORT = process.env.PORT || 3035

// configura la instancia de genkit
const ai = genkit({
  plugins: [googleAI()],
  model: gemini20Flash // set default model
});


export const helloword = ai.defineFlow(
  {
    name: 'helloword' //nombre de api
  },
  async () => {
    // haz una consulta al modelo
    const { text } = await ai.generate({
      prompt: '**aqui definir el promt**',
      output:{ 
          format: 'text' //definir el formato de respuesta
      }
  });
    return text // text.replace(/(\r\n|\n|\r)/g, "")
  }

)



startFlowServer({
  flows: [helloword],
  port: PORT
})


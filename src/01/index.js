'use strict'

/**
 * 
 * Dos ejemplos basicos hola mundo, uno simple conp textos que llegan con saltos de linea.
 * El segundo con una respuesta estructurada.
 */

// Importar genkit y googleAI plugin library

import { gemini20Flash, googleAI } from '@genkit-ai/googleai'
import { genkit, z } from 'genkit'
import { startFlowServer } from '@genkit-ai/express'
import dotenv from 'dotenv'
dotenv.config()


const PORT = process.env.PORT || 3035

// configura la instancia de genkit
const ai = genkit({
  plugins: [googleAI()],
  model: gemini20Flash // set default model
});


export const hellowordlflow1 = ai.defineFlow(
  {
    name: 'hellowordlflow1' //nombre de api
  },
  async () => {
    // haz una consulta al modelo
    const { text } = await ai.generate({
      prompt: 'Hello, Gemini,saludame en 5 idiomas!',
      output:{ 
          format: 'text'
      }
  });
    return text.replace(/(\r\n|\n|\r)/g, "")
  }

)


// response para el flujo como un array
  
const ResponseOut = z.array(
  z.object({
  language: z.string(),
  greeting: z.string()

}));


export const hellowordlflow2 = ai.defineFlow(
  {
    name: 'hellowordlflow2' //nombre de api
  },
  async () => {
    // haz una consulta al modelo
    const { text } = await ai.generate({
      prompt: 'Hello, Gemini,saludame en 5 idiomas!, agrega al saludo alegria y un texto mas largo. Responde respetando el schemas indicado',
      output: { 
        format: 'json', 
        schema: ResponseOut
       }
  });
    return text
  }

)


startFlowServer({
  flows: [hellowordlflow1, hellowordlflow2],
  port: PORT
})


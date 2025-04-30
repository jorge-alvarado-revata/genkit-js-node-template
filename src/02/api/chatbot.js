'use strict'


import express from 'express'
import { gemini20Flash, googleAI } from '@genkit-ai/googleai'
import { genkit, z} from 'genkit'




export const RequestIn = z.object({
    consulta: z.string()
  });

  
export const ResponseOut = z.object({
    respuesta: z.string()

  });


const router = express.Router()


// Limitar tipo de respuesta

const safetySettings = [
  {
    category: "HARM_CATEGORY_HARASSMENT",
    threshold: "BLOCK_LOW_AND_ABOVE",
  },
  {
    category: "HARM_CATEGORY_HATE_SPEECH",
    threshold: "BLOCK_LOW_AND_ABOVE",
  },
];

const ai = genkit({
  plugins: [googleAI()],
    model: gemini20Flash,
    config: {
      safetySettings: safetySettings
    }
})


const asistenteHotel = ai.defineFlow(
  {
    name: 'asistenteHotel',
    inputSchema: RequestIn,
    outputSchema: ResponseOut,

  },
  async (data) => {

    try{

        const parsedInput = RequestIn.parse(data);

        const { text } = await ai.generate({
            model:gemini20Flash,
            system: 'Tu eres un asistente de reserva de hotel, solo puedes responder información relacionada a información de hoteles y de reservas.',
            prompt:`Brinda información corta y consisa sobre la consulta del cliente. ${parsedInput.consulta}, incluye al final de tu respuesta una pregunta si desea mayor información. 
            Response with schema from output. En caso el mensaje incluya una despedida, responder con una despedida nada mas, ya no incluir preguntas.`,
            config: {
                maxOutputTokens: 800,
                stopSequences: ['<end>', '<fin>'],
                temperature: 1.0,
                topP: 0.4,
                topK: 10,
              },
            output:{ 
                format: 'json',
                schema: ResponseOut
            }
        });
    
        if (!text) {
            throw new Error('No data generated.');
        };
    
        const value = ResponseOut.parse(JSON.parse(text));

        return value;
  

    }
    catch(error){

        if (error instanceof z.ZodError){
            for(const issue of error.issues){
              console.error("Validation failed: ", issue.message);
            }
        }
        else {
            console.error("Unexpected error: ", error);
        }

    }


  }
);



router.post('/', async (req, res)=>{


  try {

    var consulta = req.body.data.consulta
    
    let consultaReq = { consulta: consulta }

    const { respuesta } = await asistenteHotel(consultaReq)

  
    if (!respuesta){
      throw new createHTTPError("google GENAI secret key not found!");
    }
    else {

      res.send({
        respuesta: respuesta
      })
  

    }
  }
  catch(err){
    res.send({
      error: err
    })

  }

})


export default router

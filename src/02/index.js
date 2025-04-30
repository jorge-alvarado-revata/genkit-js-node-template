'use strict'

/**
 * Ejemplos usando una estructura de proyecto express
 */

import app from './app.js'
import dotenv from 'dotenv'
dotenv.config()

const PORT = process.env.PORT || 3035

app.listen(PORT, ()=>{
    console.log(`Express with genkit started on port ${PORT}`);
})

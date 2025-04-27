'use strict'

import express from 'express'
import bearerToken from "express-bearer-token"
import { decodeJwt } from "./middlewares/auth.js"
import bodyParser from "body-parser"

import characterRouter from './characters/index.js'
// import loginRouter from './login/index.js'
// import registerRouter from './register/index.js'

let app = express()

// Middlewares
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use('/characters', characterRouter)
// app.use('/login', loginRouter)
// app.use('/register', registerRouter)

export function start(port) {
    app.listen(port, () => {
        console.log('API Iniciada en el puerto ' + port)
    })
}
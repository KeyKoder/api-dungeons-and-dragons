'use strict'

import express from 'express'
import bearerToken from "express-bearer-token";
import { decodeJwt } from "./middlewares/auth.js";
import bodyParser from "body-parser";

import characterRouter from './characters/index.js'

let app = express()

// Middlewares
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

app.use(bearerToken({
    bodyKey: 'access_token',
    queryKey: 'access_token',
    headerKey: 'Bearer',
    reqKey: 'token',
    cookie: false
}))

app.use(decodeJwt)

app.use('/characters', characterRouter)

export function start(port) {
    app.listen(port, () => {
        console.log('API Iniciada en el puerto ' + port)
    })
}
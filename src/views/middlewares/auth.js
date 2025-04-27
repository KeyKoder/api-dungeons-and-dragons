'use strict'

import config from 'config'
const SECRET = config.login.key
import jwt from 'jsonwebtoken'

export function decodeJwt(req, res, next) {
    if (!req.token) {
        console.log("Acceso anónimo")
        next()
        return
    }

    try {
        req.user = jwt.verify(req.token, SECRET)
        next()
    } catch (e) {
        next(401)
    }
}
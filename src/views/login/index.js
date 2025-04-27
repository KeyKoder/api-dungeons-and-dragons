'use strict'

import jwt from 'jsonwebtoken'
import { Router } from 'express'
import config from "config"
import passToHash from "#utils/passToHash.js"
import userController from "#controllers/users/index.js"

let router = Router()

const SECRET= config.login.key

router.get('/', (req, res) => {
    if (!req.query.user || !req.query.pass) {
        res.status(403).send('Invalid user')
        return
    }

    let passHash = passToHash(req.query.pass)
    console.log(req.query)

    if(userController.logUser(req.query.user, passHash) !== null){
        res.status(200).send({
            token: jwt.sign({
                id: req.query.idUsuario,
                username: req.query.user,
                password: passHash
            }, SECRET),
        })
    }else{
        res.status(404).send('Invalid user')
    }

})

export default router
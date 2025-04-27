'use strict'

import jwt from 'jsonwebtoken'
import { Router } from 'express'
import config from "config"
import passToHash from "#utils/passToHash.js"
import userController from "#controllers/users/index.js"
import { NIL as NIL_UUID, v4 as uuidv4 } from 'uuid'

let router = Router()

const SECRET = config.login.key

router.post('/', async (req, res) => {
    let { user, pass } = req.body

    if (!user || !pass) {
        res.status(400).send('Missing required fields')
        return
    }

    let passHash = passToHash(pass)


    if (newUser) {
        res.status(201).send({
            token: jwt.sign({
                id: newUser.id,
                username: user,
                password: passHash
            }, SECRET),
        })
    } else {
        res.status(500).send('Error creating user')
    }
})

export default router
'use strict'

import characterController from "#controllers/characters/index.js";
import { Router } from 'express'

let router = Router()

router.use((req, res, next) => {
    if (!req.user) {
        next(401)
    }
    next()
})

router.get('/', (req, res) => {
    res.send(characterController.getAll())
})

router.post('/', (req, res) => {
    if(characterController.verifyData(req.body)) {
        let newId = characterController.add(req.body)
        let character = characterController.getById(newId)
        res.send(character[0])
    }else {
        res.status(400).send("Character format not valid")
    }
})

router.get('/:cid', (req, res) => {
    res.send(req.character)
})

router.param('cid', (req, res, next, cid) => {
    let character = characterController.getById(req.params.cid)
    if (!character) {
        res.status(404).send('Character not found')
        next(404)
    } else {
        req.character = character
        next()
    }
} )

export default router
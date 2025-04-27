'use strict'

import characterController from "#controllers/characters/index.js"
import { Router } from 'express'

let router = Router()

router.get('/', (req, res) => {
    res.send(characterController.getAll())
})

router.post('/', (req, res) => {
    if(characterController.verifyData(req.body)) {
        let newId = characterController.add(req.body, req.user)
        let character = characterController.getById(newId)
        res.send(character)
    }else {
        res.status(400).send("Character format not valid")
    }
})

router.get('/:cid', (req, res) => {
    res.send(req.character)
})

router.put('/:cid', (req, res) => {
    let ok = characterController.modify(req.params.cid, req.body)
    if(ok) res.status(200).send()
    else res.status(404).send()
})

router.delete('/:cid', (req, res) => {
    let ok = characterController.delete(req.params.cid)
    if(ok) res.status(200).send()
    else res.status(404).send()
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
})

router.get('/:cid/equipment', (req, res) => {
    let equipment = characterController.getEquipment(req.params.cid)
    if(equipment !== null) res.send(equipment)
    else res.status(404).send()
})

router.post('/:cid/equipment', (req, res) => {
    let ok = characterController.addEquipment(req.params.cid, req.body)
    if(ok) res.status(200).send()
    else res.status(404).send()
})

export default router
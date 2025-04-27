'use strict'

import rollController from "#controllers/roll/index.js"
import { Router } from 'express'

let router = Router()

router.post('/', (req, res) => {
    res.send(rollController.roll(req.body))
})

export default router
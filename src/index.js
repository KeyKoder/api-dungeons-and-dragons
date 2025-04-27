'use strict'

import config from 'config'
const PORT = config.port
import { start } from '#views/index.js'

console.log(`Iniciando API...`)

start(PORT)

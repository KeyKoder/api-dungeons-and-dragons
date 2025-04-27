'use strict'

import {createHash} from "node:crypto";

export default function passHashGenerator(password) {
    return createHash('sha256')
        .update(password, 'utf8')
        .digest()
        .toString('hex')
}
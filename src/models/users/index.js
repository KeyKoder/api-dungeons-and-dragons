'use strict'

import config from 'config'
import { v4 as uuidv4 } from "uuid"

const USERS = [
    {
        id: "",
        name: "",
        password: ""
    }
]

class UserModel {
    getById(id) {
        return USERS.filter(x => x.id === id)
    }

    getByUsername(username) {
        return USERS.filter(x => x.name === username)
    }

    add(username, passwordHash) {
        if(this.getByUsername(username).length > 0) return null
        let newId = uuidv4()
        USERS.push({
            id: newId,
            name: username,
            password: passwordHash
        })
        return newId
    }
}

export default new UserModel()
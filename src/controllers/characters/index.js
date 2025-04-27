'use strict'

import characterModel from "#models/characters/index.js"

class CharacterController {
    getAll() {
        // Return everything except for the user id of the owner
        return characterModel.getAll().map(char => {
            let {owner: _, ...data} = char
            return data
        })
    }

    getById(id) {
        let characters = characterModel.getById(id)
        if (characters.length > 0) {
            return characters[0]
        } else {
            return null
        }
    }

    add(data) {
        return characterModel.add(data)
    }

    verifyData(data) {
        return characterModel.verifyData(data)
    }

    modify(id, data) {
        return characterModel.modify(id, data)
    }

    delete(id) {
        return characterModel.delete(id)
    }
    
    addEquipment(id, data) {
        return characterModel.addEquipment(id, data)
    }

    getEquipment(id) {
        return characterModel.getEquipment(id)
    }
}

export default new CharacterController()
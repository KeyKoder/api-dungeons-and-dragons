'use strict'

import characterModel from "#models/characters/index.js";

class CharacterController {
    getAll() {
        // Return everything except for the user id of the owner
        return characterModel.getAll().map(char => {
            let {owner: _, ...data} = char
            return data
        })
    }

    getById(id) {
        let characters = characterModel.getById(Number(id))
        if (characters.length > 0) {
            return characters[0]
        } else {
            return null
        }
    }

    add(data) {
        return characterModel.add(data)
    }
}

export default new CharacterController()
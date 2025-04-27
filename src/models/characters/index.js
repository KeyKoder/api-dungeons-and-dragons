'use strict'

const CHARACTERS = [
    
]

class CharacterModel {
    getLastId() {
        return CHARACTERS.sort((x1, x2) => x2.id - x1.id)[0].id
    }

    getAll() {
        return CHARACTERS
    }

    getById(id) {
        return CHARACTERS.filter(x => x.id === id)
    }

    add(datos) {
        let newId = this.getLastId() + 1
        CHARACTERS.push({
            id: newId,
            title: datos?.title ?? 'N/D',
            length: datos?.length ?? 0,
            year: datos?.year ?? 1900,
        })
        return newId
    }
}

export default new CharacterModel()
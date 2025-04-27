'use strict'

import { v4 as uuidv4, NIL as NIL_UUID } from "uuid"

const CHARACTERS = [
    {
        id: "00000000-0000-0000-0000-000000000000",
        name: "Pepe",
        race: "Humano",
        classes: [
            {
                class: "Pícaro",
                level: 3
            }
        ],
        hp: 15,
        ac: 10,
        stats: {
            str: 10,
            dex: 12,
            con: 10,
            int: 14,
            wis: 10,
            cha: 10
        },
        equipment: [],
        owner: "00000000-0000-0000-0000-000000000000"
    }
]

class CharacterModel {
    getAll() {
        return CHARACTERS
    }

    getById(id) {
        return CHARACTERS.filter(x => x.id === id)
    }

    add(data, userId) {
        let newId = uuidv4()
        CHARACTERS.push({
            id: newId,
            name: "",
            race: "",
            classes: [
                {
                    class: "",
                    level: 0
                }
            ],
            hp: 0,
            ac: 0,
            stats: {
                str: 0,
                dex: 0,
                con: 0,
                int: 0,
                wis: 0,
                cha: 0
            },
            equipment: [],
            owner: NIL_UUID, // Can't get authentication to work, so for now we are using an all-zeroes UUID
            ...data
        })
        return newId
    }

    verifyData(data) {
        let required_keys = ["name","race","classes","hp","ac","stats"]
        let required_stats = ["str","dex","con","int","wis","cha"]
        return required_keys.every(k => k in data) && required_stats.every(k => k in data.stats) && data.classes.length > 0
    }

    modify(id, data) {
        let index = CHARACTERS.findIndex(x => x.id === id)
        if(index == -1) return false
        CHARACTERS[index] = {...CHARACTERS[index], ...data}
        return true
    }

    delete(id) {
        let index = CHARACTERS.findIndex(x => x.id === id)
        if(index == -1) return false
        CHARACTERS.splice(index, 1)
        return true
    }
}

export default new CharacterModel()
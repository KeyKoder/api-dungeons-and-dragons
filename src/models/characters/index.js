'use strict'

const CHARACTERS = [
    {
        id: '00000000-0000-0000-0000-000000000000',
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
        owner: '00000000-0000-0000-0000-000000000000'
    }
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
            equipment: []
        })
        return newId
    }
}

export default new CharacterModel()
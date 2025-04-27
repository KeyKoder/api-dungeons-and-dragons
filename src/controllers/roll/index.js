'use strict'

import pkg from '@3d-dice/dice-roller-parser';
const { DiceRoller } = pkg;
import characterModel from "#models/characters/index.js"
const diceRoller = new DiceRoller()

class RollController {
    roll(data) {
        let diceroll = data.roll
        for(let key of Object.keys(data.context)) {
            if(key == 'characters') {
                let chardata = []
                for(let char of data.context.characters) {
                    chardata.push(characterModel.getById(char))
                }
                let chars = diceroll.matchAll(/{{(\d+?):(\w+)}}/g)
                for(let char of chars) {
                    diceroll = diceroll.replace(char[0], chardata[Number(char[1])][char[2]])
                }
            }else {
                diceroll = diceroll.replace(`{{${key}}}`, data.context[key])
            }
        }
        return diceRoller.roll(diceroll)
    }
}

export default new RollController()
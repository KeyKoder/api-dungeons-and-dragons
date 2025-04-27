'use strict'

export default function getStat(statname) {
    switch(statname) {
        case 'fue':
            return 'str'
        case 'des':
            return 'dex'
        case 'sab':
            return 'wis'
        case 'car':
            return 'cha'
        default:
            return statname
    }
}
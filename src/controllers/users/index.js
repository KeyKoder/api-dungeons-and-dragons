'use strict'

import userModel from "#models/users/index.js"

class UserController {

    logUser(username, password) {
        let user = userModel.getByUsername(username)
        if (user === null) {
            return null
        }

        if (user.password === password) {
            return {
                id: user.id
            }
        }

        return null
    }

    registerUser(username, password) {
        let user = userModel.add(username, password)
        console.log(1,user)
        if (!user) {
            return null;
        }

        return user;
    }

}

export default new UserController()
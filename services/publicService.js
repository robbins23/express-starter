const User = require("../models/User")

module.exports ={

    allUsers: async(req, res) => {
        let users = await User.find()
        return res.apiSuccess(users)
    }
}
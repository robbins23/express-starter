const User = require("../models/User")
const jwt = require('jwt-simple');
const secret = process.env.JWT_SECRET;


module.exports ={

    profile : async(req, res) => {
        let u = await User.findOne({_id : req.user.userId})
        res.apiSuccess(u)
    },

    registerUser: async(req, res) => {
        let {emailId, password, name} = req.body
        if(!emailId)return res.apiError("Email Id is required")
        if(!name)return res.apiError("Name is required")
        if(!password)return res.apiError("Password is required")
        let u = await User.findOne({emailId : emailId})
        if(u){
            return res.apiError("This Email Id is already registered!")
        }else{
            u = User.create({emailId, password, name})
            let data = {
                name : u.name,
                token : jwt.encode({userId : u.id.toString(), time : new Date().getTime()}, secret)
            }
            return res.apiSuccess(data)
        }
    },

    loginUser: async(req, res) => {
        let {emailId, password} = req.body
        let u = await User.findOne({emailId : emailId})
        if(u){
            if(u.password == password){
                let data = {
                    name : u.name,
                    token : jwt.encode({userId : u.id.toString(), time : new Date().getTime()}, secret)
                }
                req.app.get("eventEmitter").emit('login', 'Test event emitter');
                return res.apiSuccess(data)
            }
            return res.apiError("Invalid Password")
        }
        return res.apiError("Invalid Email Id")
    }
}
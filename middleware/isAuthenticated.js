const jwt = require("jsonwebtoken")
const {promisify} = require("util")
const { registers } = require("../model")



exports.isAuthenticated = async (req, res, next)=>{
    const token = req.cookies.token
    console.log(token)
    if(!token || token===null || token===undefined){
       return  res.redirect("/login")
    }
    // yadi token aayo vaney
    const verifiedResult = await promisify (jwt.verify)(token, process.env.secretkey )
    const user = await registers.findByPk(verifiedResult.id)
    if(!user){
        return res.redirect("/login")
    }
    req.registerId = verifiedResult.id
    next()
}
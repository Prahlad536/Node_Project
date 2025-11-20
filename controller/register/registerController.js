const { registers } = require("../../model")
const bcrypt=require("bcryptjs")

exports.renderRegisterForm = (req, res)=>{
    res.render("register")
}

exports.postRegisterForm = async(req, res)=>{
    console.log(req.body)
    const {username, email, password}= req.body
    await registers.create({
        username: username,
        email: email,
        password:bcrypt.hashSync(password,10)
    })
    res.send("user register successfully")
}

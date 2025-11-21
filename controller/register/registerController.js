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
    res.redirect("/login")
}

exports.renderLoginForm = (req, res)=>{
    res.render("login.ejs")
}

exports.loginUserPost = async (req, res)=>{
    const {email, password} = req.body
    //server side validation
    if(!email || !password){
        return res.send("Please provide email and password")
    }
    // check wheather the coming email user exit or not
    const user =await registers.findAll({
        where:{
            email : email
        }
    })
if(user.length == 0 ){
    res.send("No user exist with that email")
}else{
    //tyo email ko user xa vaney bhujyo--ra password pani check garney right xa ki xaina
   const isMatched= bcrypt.compareSync(password, user[0].password)
}
if(isMatched){
    res.send("Login Successfully")
}else{
    res.send("Email or Password is incorrect")
}
}
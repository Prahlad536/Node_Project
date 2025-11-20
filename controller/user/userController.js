const { users } = require("../../model")



exports.renderHome = async (get, res)=>{
    //blogs table bata data (row) nikalnu paryo ani home page lai pass garnu paryo
    const userTableUser= await users.findAll()

    res.render("home.ejs", {users: userTableUser})
}


 exports.renderUser=(req, res)=>{
    res.render("user.ejs")
}


exports.postUser = async(req, res)=>{
    console.log(process.env.name)
    // console.log(req.body)
    const {name, email, password}=req.body
    console.log(name, email, password)

    //server validation
    if(!name || !email || !password){
        return res.send("please fill up the details")
    }
    //inserting into users tables
    //database ma table ma halney method
    await users.create({
             name: name,
             email: email,
             password: password,
             image : process.env.backendUrl +   req.file.filename
    })
    res.redirect("/home")     
}


exports.renderSingleUser = async(req, res)=>{
    const id = req.params.id;

    const foundData = await users.findByPk(id);
    
    if(!foundData){
        return res.send("User Not Found");
    }

    res.render("singleUser.ejs", { userId: foundData });
}


 exports.deleteSingleUser =    async (req, res)=>{
    const id= req.params.id
    await users.destroy({
        where: {
            id : id
        }
    })
    // res.send("delete successfull")
    res.redirect("/home")
}


exports.renderUpdateUser =   async(req, res)=>{
    const id = req.params.id
    const user = await  users.findByPk(id)
    res.render("updateUser.ejs", {id: id, oldUser:user})
}


 exports.postUpdateUser =   async (req, res)=>{
    const id = req.params.id
    const{name, email, password} = req.body
    await users.update({
        name: name,
        email : email,
        password : password
    },{
        where: {
            id : id
        }
    })
    res.redirect("/user1/" + id)
}
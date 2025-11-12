const express= require('express')
const { blogs, users} = require('./model/index') //users ra blog lyaako xa index.js bata
const app=express()

// const app = require("express")()

//database connect
require("./model/index")



// telling node.js to set it view engine
app.set("view, engine", "ejs")

//middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// Home
app.get("/home",async (get, res)=>{
    const userTableUser= await users.findAll()
    res.render("home.ejs", {users: userTableUser})
})

// about
app.get("/about", (req, res)=>{
    res.render("about.ejs")
})

app.get("/adblog", (req, res)=>{
    res.render("adblog.ejs")
})

//modern way
app.post("/adblog",async (req, res)=>{
    const {title, subTitle, description}= req.body
    console.log(title, subTitle,description)
    //server validation
     if(!title || !subTitle || !description){
        return res.send("Please Provide titile, subtitle and description")
     }

      //inserting into blogs tables
     await blogs.create({
               title: title,
              subTitle: subTitle,
              description: description,
    })

      res.send("blog added successfully!!");
})


//User part
//user display in browser
app.get("/user", (req, res)=>{
    res.render("user.ejs")
})

// Post Route
app.post("/user", async(req, res)=>{
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
             password: password
    })
    res.redirect("/home")
       
})


//single user
app.get("/user1/:id", async(req, res)=>{
    const id = req.params.id
    // const foundData=await users.findByPk(id)
    const foundData = await users.findAll({
        where: {
            id : id
        }
    })
    console.log(foundData)
    res.render("singleUser.ejs", {user: foundData})
})

//delete 
app.get("/delete/:id",async (req, res)=>{
    const id= req.params.id
    await users.destroy({
        where: {
            id : id
        }
    })
    // res.send("delete successfull")
    res.redirect("/home")
})





const PORT=3000

//Traditional Approach
// app.listen(PORT, ()=>{
//     console.log(" Node.JS Project has to be started on port no" + PORT)
// })

//modern approach

app.listen(PORT,()=>{
    console.log(`Node.js project has to be started at port  ${PORT}`)
})
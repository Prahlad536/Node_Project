const express= require('express')
const { blogs, users} = require('./model/index')
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
app.get("/home", (get, res)=>{
    res.render("home.ejs")
})

// app.get("/about", (req, res)=>{
//     res.render("about.ejs")
// })

app.get("/adblog", (req, res)=>{
    res.render("adblog.ejs")
})

//modern way
app.post("/adblog",async (req, res)=>{
    const {title, subTitle, description}= req.body
    console.log(title, subTitle,description)

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

app.post("/user", async(req, res)=>{
    const {name, email, password}=req.body
    console.log(name, email, password)

    //inserting into users tables
    await users.create({
             name: name,
             email: email,
             password: password
    })
    res.send("Register Success Fully!!!")
       
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
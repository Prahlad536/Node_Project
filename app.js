const express= require('express')
// const { blogs, users} = require('./model/index') //users ra blog lyaako xa index.js bata
require("dotenv").config() //env import garney code
const app=express()

const userRoute = require('./routes/userRoute')
const formRoute= require("./routes/registerFormRoute")


// const app = require("express")()

// //database connect
require("./model/index")



// telling node.js to set it view engine
app.set("view engine", "ejs")

//middleware
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// // Home
// app.get("/home", renderHome)


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
// //user display in browser
// app.get("/user",renderUser)

// // Post Route
// app.post("/user", upload.single('image'),   postUser)
//

//single user
// app.get("/user1/:id", async(req, res)=>{
//     const files = req.files

//     const id = req.params.id
//     // const foundData=await users.findByPk(id)
//     const foundData = await users.findAll({   // findall gare vaney yo array ma auxa hamilai [0] garnu parxa excess garna ko lagi
//         where: {
//             id : id
//         }
//     })
//     console.log(foundData)
//     res.render("singleUser.ejs", {userId: foundData, files: files})
// })

//
// app.get("/user1/:id", renderSingleUser);
//



//delete 
// app.get("/delete/:id", deleteSingleUser)
//
// app.get("/update/:id", renderUpdateUser )
// app.post("/update/:id",  postUpdateUser)
//



// upload vaney folder lai acces dinxa
app.use(express.static('./uploads'));

// external css lai link garna help garxa
app.use(express.static(__dirname + "/public"));
// app.use(express.static("/public/styles/"))


//route lai connect garna help garxa
//  /hello + /home = /hello/home = yadi hame ley yesma "/hello" diyau vaney tara hmailai yo xayeko xaina so   hamiley yesma "" khali XODXau
app.use("", userRoute)
app.use("", formRoute)

const PORT=3000

//Traditional Approach
// app.listen(PORT, ()=>{
//     console.log(" Node.JS Project has to be started on port no" + PORT)
// })

//modern approach

app.listen(PORT,()=>{
    console.log(`Node.js project has to be started at port  ${PORT}`)
})
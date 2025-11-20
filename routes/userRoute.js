const { renderHome, renderUser, postUser, renderSingleUser, deleteSingleUser, renderUpdateUser, postUpdateUser } = require('../controller/user/userController')
const { storage, multer } = require("../middleware/multerConfig") //storage ra multer lyaako xau multerConfig.js bata

// const userController = require("../controller/user/userController");




const router = require('express').Router()

const upload = multer({ storage: storage });



router.route("/home").get(renderHome)
router.route("/user").get(renderUser).post(upload.single('image'), postUser)
router.route("/user1/:id").get(renderSingleUser)
router.route("/delete/:id").get(deleteSingleUser)
router.route("/update/:id").get(renderUpdateUser).post(postUpdateUser)



module.exports = router
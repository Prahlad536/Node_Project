const { renderRegisterForm, postRegisterForm, loginUserPost, renderLoginForm} = require("../controller/register/registerController")



const router = require("express").Router()

router.route("/register").get(renderRegisterForm).post(postRegisterForm)
router.route("/login").get(renderLoginForm ).post(loginUserPost)



module.exports = router 
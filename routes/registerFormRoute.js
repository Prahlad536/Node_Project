const { renderRegisterForm, postRegisterForm } = require("../controller/register/registerController")



const router = require("express").Router()

router.route("/register").get(renderRegisterForm).post(postRegisterForm)

module.exports = router 
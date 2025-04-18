const routes = require("express").Router()
const userController = require("../controllers/usersController")
const authMiddleware  = require("../middleware/AuthMiddleware")

routes.post("/signup", userController.signup)
routes.post("/login", userController.login)
routes.get("/getallusers", authMiddleware.authMiddleware, userController.getAllUser)
routes.get("/getuser/:id", userController.finduserbyid)
routes.post("/loginwithtoken", userController.loginuserWithToken)
routes.post("/resetpassword", userController.resetpassword)

module.exports = routes 
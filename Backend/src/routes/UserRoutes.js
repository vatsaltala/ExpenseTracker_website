const routes = require("express").Router()
const userController = require("../controllers/usersController")
const authMiddleware  = require("../middleware/AuthMiddleware")

routes.post("/signup", userController.signup)
routes.post("/login", userController.login)
routes.get("/getallusers", authMiddleware.authMiddleware, userController.getAllUser)
routes.get("/getuser/:id",authMiddleware.authMiddleware, userController.finduserbyid)
routes.post("/loginwithtoken", userController.loginuserWithToken)
routes.post("/resetpassword",authMiddleware.authMiddleware, userController.resetpassword)

module.exports = routes 
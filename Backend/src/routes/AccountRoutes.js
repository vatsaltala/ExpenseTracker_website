const accountcontroller= require("../controllers/AccountController")
const routes= require("express").Router()

routes.post("/account", accountcontroller.saveaccount )
routes.get("/accounts", accountcontroller.allaccount)
routes.get("/account/:id", accountcontroller.findaccountbyid)
routes.delete("/account/:id", accountcontroller.findaccountbyidanddelete)

module.exports=routes
const rolecontroller= require("../controllers/RoleController")
const routes= require("express").Router()

routes.post("/addrole", rolecontroller.saverole )
routes.get("/roles", rolecontroller.allrole)
routes.get("/role/:id", rolecontroller.findrolebyid)
routes.delete("/deleterole/:id", rolecontroller.findrolebyidanddelete)

module.exports=routes
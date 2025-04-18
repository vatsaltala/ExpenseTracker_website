const issuecontroller= require("../controllers/IssueController")
const routes= require("express").Router()

routes.post("/addissue", issuecontroller.saveissue )
routes.get("/issues", issuecontroller.allissue)
routes.get("/issue/:id", issuecontroller.findissuebyid)
routes.delete("/deleteissue/:id", issuecontroller.findissuebyidanddelete)

module.exports=routes
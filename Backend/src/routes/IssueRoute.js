const issuecontroller= require("../controllers/IssueController")
const routes= require("express").Router()

routes.post("/addissue",authMiddleware.authMiddleware, issuecontroller.saveissue )
routes.get("/issues",authMiddleware.authMiddleware, issuecontroller.allissue)
routes.get("/issue/:id",authMiddleware.authMiddleware, issuecontroller.findissuebyid)
routes.delete("/deleteissue/:id",authMiddleware.authMiddleware, issuecontroller.findissuebyidanddelete)

module.exports=routes
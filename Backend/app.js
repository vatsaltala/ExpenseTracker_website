const express=require("express")
const mongoose= require("mongoose")
const app=express()
const cors=require("cors")
app.use(express.json())
app.use(cors())
require('dotenv').config();


mongoose.connect(process.env.database_url).then(()=>{ 
    console.log("database connected")
}) 

const UploadRoutes= require("./src/routes/UploadRoutes")
app.use("/upload", UploadRoutes);

const UserRoutes =require("./src/routes/UserRoutes")
app.use("/user",UserRoutes)

const RoleRoutes =require("./src/routes/RoleRoutes")
app.use("/role",RoleRoutes)

const AccountRoutes =require("./src/routes/AccountRoutes")
app.use("/account",AccountRoutes)

const CategoryRoutes =require("./src/routes/CategoryRoutes")
app.use("/category",CategoryRoutes)

const ExpenseRoutes =require("./src/routes/ExpenseRoutes")
app.use("/expense",ExpenseRoutes)

const IncomeRoutes =require("./src/routes/IncomeRoutes")
app.use("/income",IncomeRoutes)

const IssueRoutes = require("./src/routes/IssueRoute")
app.use("/issue", IssueRoutes)


const IncomeCategoryRoutes=require("./src/routes/IncomeCategoryRoutes")
app.use("/incomecategory",IncomeCategoryRoutes)

const PORT = process.env.port;
app.listen(PORT,()=>{
    console.log("server started on port no",PORT)
})
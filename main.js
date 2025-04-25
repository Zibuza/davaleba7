const express = require("express")
const connectToDb = require("./db/db")
const app = express()
const moviesRouter = require("./routes/moviesRouter")
const directorsRouter = require("./routes/directorsRouter")
app.use(express.json())
connectToDb()

app.use("/movies", moviesRouter)
app.use("/director", directorsRouter)

app.get("/", (req,res) =>{
    res.send("index page")
})
app.listen(3000, ()=>{
    console.log("server is running on http://localhost:3000");
    
})
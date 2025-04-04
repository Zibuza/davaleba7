const express = require("express")
const connectToDb = require("./db/db")
const app = express()
const productsRouter = require("./routes/products.router")
app.use(express.json())
connectToDb()

app.use("/products", productsRouter)

app.get("/", (req,res) =>{
    res.send("index page")
})
app.listen(3000, ()=>{
    console.log("server is running on http://localhost:3000");
    
})
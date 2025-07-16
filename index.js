import express from "express";

const app = express();

app.use(express.json());

app.post("/api/user", function(req,res){
    console.log("I am inside post method");
    res.status(200).json({
        status:"Success",
        message:"sending response frm post method"
    })
})
app.get("/api/user/get", function(req,res){
    res.json({
        message:"Get request is successfull"
    })
})

app.listen(3000, ()=>{
        console.log("Server is running on port 3000");
})

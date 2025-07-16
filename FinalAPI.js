import express from 'express'
import fs from 'fs'
import shortUUID from 'short-uuid';

const short = shortUUID;
const app = express();

const strContent = fs.readFileSync("./dev-data.json","utf-8");
const UserDataStore = JSON.parse(strContent);

app.get("/api/user", function(req,res){
    try{
        console.log("I am inside get method");
        if(UserDataStore.length == 0){
            throw new Error("No users Found");
        }
        res.status(200).json({
            status:"success",
            message:UserDataStore
        })
    }
    catch(err){
        res.status(404).json({
            status:"Failure",
            message:err.message
        })
    }
});

app.use(express.json());

app.use(function(req,res,next){
    if(req.method == "POST"){
        const UserDetails = req.body;
        const isEmpty = Object.keys(UserDetails).length == 0;
        if(isEmpty){
            res.status(404).json({
                status:"failure",
                message:"User details are empty"
            })
        }
        else{
            next();
        }
    }
    else{
        next();
    }
})

app.post("/api/user",function(req,res){
    const id = short.generate();
    const UserDetails = req.body;
    UserDetails.id = id;

    UserDataStore.push(UserDetails);
    const strUserStore = JSON.stringify(UserDataStore);
    fs.writeFileSync("./dev-data.json", strUserStore);

    res.status(200).json({
        status:"success",
        message:"got response from post method"
    })
})

app.get("/api/user/:userId", function(req,res){
    try{
        const userId = req.params.userId;
        const UserDetails = getUserById(userId);
        if(UserDetails == "no users found"){
            throw new Error(`user with ${userId} not found`);
        }
        else{
            res.status(200).json({
            status:"success",
            message:UserDetails
        })
        }
    }
    catch(err){
        res.status(404).json({
            status:"failure",
            message:err.message
        })
    }
})

function getUserById(id){
    const user = UserDataStore.find((user)=>{
        return user.id == id;
    })
    if(user == undefined){
            return "no user found"
        }
        else{
            return user;
        }
}


app.use(function(req,res){
    res.status(200).json({
        status:"failure",
        message:"404 page not found"
    })
})

const port = process.env.PORT || 3000;

app.listen(port, function(req,res){
    console.log(`server is running on ${port} port`);
})
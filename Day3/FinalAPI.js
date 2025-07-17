import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
dotenv.config();
const { db_user , db_password} = process.env;
const app = express();


const dbURL = `mongodb+srv://${db_user}:${db_password}@cluster0.yayfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbURL).then(function(connection){
    console.log("Connection Successfull");
}).catch(err => console.log(err));


const userSchemaRules = {
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:8
    },
    confirmPassword:{
        type:String,
        required:true,
        minlength:8,
        validate:function(){
            return this.password == this.confirmPassword;
        }
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
}

const userSchema = new mongoose.Schema(userSchemaRules);

const UserModel = mongoose.model("UserModal", userSchema);








app.use(express.json());

app.get("/api/user", getAllUsers);

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

app.post("/api/user", createUserHandler);

app.get("/api/user/:userId", async function(req,res){
    try{
        const userId = req.params.userId;
        const UserDetails = await UserModel.findById(userId);
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

async function createUserHandler(req, res) {
  try {
    const userDetails = req.body;
    const user = await UserModel.create(userDetails);
    res.status(200).json({
      status: "success",
      message: `added the user`,
      user,
    });
  } 
  catch(err){
    res.status(500).json({
        status:"failure",
        message:err.message
    })
  }
}

async function getAllUsers(req,res){
    try{
        console.log("I am inside get method");
        const UserDataStore = await UserModel.find();
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
}
app.use(function(req,res){
    res.status(200).json({
        status:"failure",
        message:"404 page not found"
    })
})

const port = process.env.PORT || 3000 ;
app.listen(port, function(req,res){
    console.log(`Server is running at this port ${port}`);
})
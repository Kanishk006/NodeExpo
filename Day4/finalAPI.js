import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import UserModel from './UserModel.js'
import ProductModel from './ProductModel.js'
import { getAllFactory, createFactory , getElementByIdFactory, deleteByIdFactory } from './utility/crudFactory.js';

dotenv.config();
const { db_user , db_password} = process.env;
const app = express();


const dbURL = `mongodb+srv://${db_user}:${db_password}@cluster0.yayfp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

mongoose.connect(dbURL).then(function(connection){
    console.log("Connection Successfull");
}).catch(err => console.log(err));


app.use(express.json());

const checkInput = function(req,res,next){
    if(req.method == "POST"){
        const UserDetails = req.body;
        const isEmpty = Object.keys(UserDetails).length == 0;
        if(isEmpty){
            res.status(404).json({
                status:"failure",
                message:"User details are empty"
            })
        }
    }
    else{
        next();
    }
};
const deleteById = deleteByIdFactory(UserModel);
const createUserHandler = createFactory(UserModel);
const getAllUsers = getAllFactory(UserModel); 
app.get("/api/user/:userId", getElementByIdFactory(UserModel));
app.post("/api/user", checkInput , createUserHandler);
app.get("/api/user", getAllUsers);
app.delete("/api/user/:userId",deleteById);

/************Products****************/

const createProductHandler = createFactory(ProductModel);
const getProductById = getElementByIdFactory(ProductModel);
const getAllProductHandler = getAllFactory(ProductModel);
const deleteProductById = deleteByIdFactory(ProductModel);

/*************Product API's********/

app.get("/api/product", getAllProductHandler);

app.post("/api/product", createProductHandler);

app.get("/api/product/:productId", getProductById);

app.delete("/api/product/:productId", deleteProductById);

/***********************************/


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
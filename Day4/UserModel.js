import mongoose from 'mongoose'

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

export default UserModel;
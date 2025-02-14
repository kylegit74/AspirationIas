import mongoose from "mongoose";
const Login=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:string ,
        required:true
    }

})
const  LoginModel=mongoose.model('LoginModel',Login);
export default LoginModel;
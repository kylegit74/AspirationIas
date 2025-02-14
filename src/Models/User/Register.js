import mongoose from 'mongoose'
import bcrypt from 'bcryptjs';
const User=mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
})

User.pre('save', async function (next){
    try{
        const salt=await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password, salt);
        next();
    }
    catch(error)
    {
        next(error);
    }


})
const UserModel=mongoose.model('UserModel', User);
export default UserModel;
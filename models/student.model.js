import mongoose from 'mongoose';

export const StudentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    phone:{
        type:String,
        required:true,
    },
    age:{
        type:Number,
        required:true,
        min:16,
        max:50,
    },
    course:{
        type:String,
        required:true,
    }
},{timestamps: true});

export const StudentModel = mongoose.model('Student',StudentSchema);
import mongoose from "mongoose";

export const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB server successfully.");
    }catch(err){
        console.error({
            status: 500,
            statusText: "An error occurred . connect to MongoDB server failed",
            message: err.message,
        })
    }
}
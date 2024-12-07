import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://sonaiyavicky:Aarvi7497@cluster0.wecp5bx.mongodb.net/TOMMATO').then(()=>console.log("DB Connected"));
}